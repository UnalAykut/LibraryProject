import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUserById,updateUserById,getUserById } from "../../../Api/api"; // Backend API fonksiyonları
import "../../../Css/Admin/UserList.css"; // CSS dosyası
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal"; // Modal bileşenini içe aktar
import EditUserModal from"../components/modals/EditUserModal";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false); // Modal gösterimi
  const [selectedUser, setSelectedUser] = useState(null); // Silinecek kullanıcı
  const [showEditModal, setShowEditModal] = useState(false); // Düzenleme modalı gösterimi
  const [userToEdit, setUserToEdit] = useState(null); // Düzenlenecek kullanıcı
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log("2 kez loglama işlemi");
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Kullanıcılar alınamadı:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesId = user.id ? String(user.id).includes(searchId) : true;
      const matchesUsername = user.username
        ? user.username.toLowerCase().includes(searchUsername.toLowerCase())
        : true;
      const matchesEmail = user.email
        ? user.email.toLowerCase().includes(searchEmail.toLowerCase())
        : true;
      const matchesRole = filterRole ? user.role === filterRole : true;

      return matchesId && matchesUsername && matchesEmail && matchesRole;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchId, searchUsername, searchEmail, filterRole, users]);

  const getRandomAvatar = (username) => {
    return `https://ui-avatars.com/api/?name=${username}&background=random&size=64`;
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id); // Kullanıcıyı API'den sil
      setUsers(users.filter((user) => user.id !== id)); // Kullanıcıyı state'den kaldır
      setShowModal(false);
    } catch (error) {
      console.error("Kullanıcı silinemedi:", error);
    }
  };
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Düzenleme modalını aç
  const openEditModal = async (userId) => {
    try {
      const userDetails = await getUserById(userId); // Kullanıcı bilgilerini API'den al
      setUserToEdit(userDetails); // Gelen kullanıcı bilgilerini state'e ata
      setShowEditModal(true); // Modalı aç
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  };
// Kullanıcıyı güncelleme işlemi
const handleSaveUser = async (updatedUser) => {
  try {
    await updateUserById(updatedUser); // Backend'e istekte bulun
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    ); // State'i güncelle
    setShowEditModal(false);
  } catch (error) {
    console.error("Kullanıcı güncellenemedi:", error);
  }
};

  return (
    <div className="user-list">
      <h1>Kullanıcı Listesi</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="ID'ye göre ara"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Kullanıcı adına göre ara"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="E-posta adresine göre ara"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="search-input"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="role-filter"
        >
          <option value="">Tümü</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı Adı</th>
            <th>Email</th>
            <th>Rol</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <div className="user-info">
                  <img
                    src={getRandomAvatar(user.username)}
                    alt="Avatar"
                    className="user-avatar"
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => openEditModal(user.id)}
                  className="edit-button"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => openModal(user)}
                  className="delete-button"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
  {/* Geri Butonu */}
  <button
    onClick={handlePreviousPage}
    className="pagination-button"
    disabled={currentPage === 1}
  >
    &laquo; Geri
  </button>

  {/* Sayfa Numara Butonları */}
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => handlePageClick(index + 1)}
      className={`pagination-button ${
        currentPage === index + 1 ? "active" : ""
      }`}
    >
      {index + 1}
    </button>
  ))}

  {/* İleri Butonu */}
  <button
    onClick={handleNextPage}
    className="pagination-button"
    disabled={currentPage === totalPages}
  >
    İleri &raquo;
  </button>
</div>

        {/* Modal Bileşeni */}
        <DeleteConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDelete(selectedUser.id)}
        message={`ID: ${selectedUser?.id} ve Adı: ${selectedUser?.username} olan kullanıcıyı silmek istediğinizden emin misiniz?`}
      />
       <EditUserModal
      show={showEditModal}
      user={userToEdit}
      onClose={() => setShowEditModal(false)}
      onSave={handleSaveUser}
    />
    </div>
  );
};

export default UserList;

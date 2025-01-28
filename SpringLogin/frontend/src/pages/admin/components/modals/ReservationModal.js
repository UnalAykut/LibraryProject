import React, { useEffect, useState } from "react";
import { getAllBooks, getAllUsers } from "../../../../Api/api";
import "../../../../Css/Admin/ReservationModal.css";

const ReservationModal = ({ show, onClose, onSave }) => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchBook, setSearchBook] = useState("");
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentBookPage, setCurrentBookPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        const booksData = await getAllBooks();
        setUsers(usersData);
        setBooks(booksData);
      } catch (error) {
        console.error("Veriler alınamadı:", error);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchBook.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentUserPage - 1) * itemsPerPage,
    currentUserPage * itemsPerPage
  );

  const paginatedBooks = filteredBooks.slice(
    (currentBookPage - 1) * itemsPerPage,
    currentBookPage * itemsPerPage
  );

  const handleSave = () => {
    if (!selectedUserId || !selectedBookId) {
      alert("Kullanıcı ve kitap seçimi zorunludur!");
      return;
    }
    const newReservation = {
      userId: parseInt(selectedUserId),
      bookId: parseInt(selectedBookId),
    };
    onSave(newReservation);
  };

  const handleRemoveUser = () => {
    setSelectedUserId("");
  };

  const handleRemoveBook = () => {
    setSelectedBookId("");
  };

  if (!show) return null;

  return (
    <div className="reservation-modal-overlay">
      <div className="reservation-modal-content">
        <h2>Yeni Rezervasyon Oluştur</h2>

        {/* Kullanıcı Seçimi */}
        <div className="form-group">
          <label>Kullanıcı Ara</label>
          <input
            type="text"
            placeholder="Kullanıcı adı ara..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="search-input"
          />
          <label>Kullanıcı Seç</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="dropdown"
            size={5}
          >
            {paginatedUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} (ID: {user.id})
              </option>
            ))}
          </select>
          <div className="pagination">
            <button
              disabled={currentUserPage === 1}
              onClick={() => setCurrentUserPage((prev) => prev - 1)}
            >
              &laquo; Geri
            </button>
            <button
              disabled={currentUserPage >= Math.ceil(filteredUsers.length / itemsPerPage)}
              onClick={() => setCurrentUserPage((prev) => prev + 1)}
            >
              İleri &raquo;
            </button>
          </div>
        </div>

        {/* Kitap Seçimi */}
        <div className="form-group">
          <label>Kitap Ara</label>
          <input
            type="text"
            placeholder="Kitap adı ara..."
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            className="search-input"
          />
          <label>Kitap Seç</label>
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className="dropdown"
            size={5}
          >
            {paginatedBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} (ID: {book.id})
              </option>
            ))}
          </select>
          <div className="pagination">
            <button
              disabled={currentBookPage === 1}
              onClick={() => setCurrentBookPage((prev) => prev - 1)}
            >
              &laquo; Geri
            </button>
            <button
              disabled={currentBookPage >= Math.ceil(filteredBooks.length / itemsPerPage)}
              onClick={() => setCurrentBookPage((prev) => prev + 1)}
            >
              İleri &raquo;
            </button>
          </div>
        </div>

        {/* Seçilen Kullanıcı ve Kitap */}
        <div className="selected-items">
          {selectedUserId && (
            <div className="selected-item">
              <span>Kullanıcı: {users.find((u) => u.id === parseInt(selectedUserId))?.username}</span>
              <button onClick={handleRemoveUser} className="remove-button">
                ✖
              </button>
            </div>
          )}
          {selectedBookId && (
            <div className="selected-item">
              <span>Kitap: {books.find((b) => b.id === parseInt(selectedBookId))?.title}</span>
              <button onClick={handleRemoveBook} className="remove-button">
                ✖
              </button>
            </div>
          )}
        </div>

        {/* Kaydet ve İptal Butonları */}
        <div className="modal-actions">
          <button onClick={handleSave} className="save-button">
            Kaydet
          </button>
          <button onClick={onClose} className="cancel-button">
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;

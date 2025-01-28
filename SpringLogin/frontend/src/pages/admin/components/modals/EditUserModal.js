import React, { useState,useEffect } from "react";
import "../../../../Css/Admin/EditUserModal.css"; // Modal için CSS dosyası

const EditUserModal = ({ show, user, onClose, onSave }) => {
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState(user?.password || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  
   // Modal her açıldığında veya user değiştiğinde input değerlerini güncelle
   useEffect(() => {
    console.log("User prop:", user);
    if (user) {
      setUsername(user.username || "");
      setPassword(""); // Şifre boş tutulabilir (güvenlik için)
      setEmail(user.email || "");
      setRole(user.role || "");
    }
  }, [user]);


  if (!show) return null;

  const handleSave = () => {
    const updatedUser = { ...user, username,password, email, role };
    onSave(updatedUser); // Düzenlenen kullanıcı bilgilerini gönder
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Kullanıcıyı Düzenle</h2>
        <form>
          <label>
            Kullanıcı Adı:
            <input
              type="text"
              placeholder={user?.username || "Kullanıcı Adı"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Şifre:
            <input
              type="text"
              placeholder="Yeni Şifre Girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              placeholder={user?.email || "Email Adresi"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Rol:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
        </form>
        <div className="modal-actions">
          <button onClick={handleSave} className="save-button">Kaydet</button>
          <button onClick={onClose} className="cancel-button">İptal</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

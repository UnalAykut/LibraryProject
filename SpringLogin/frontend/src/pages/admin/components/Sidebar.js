
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Home, Group, Book, AdminPanelSettings,History,Logout   } from "@mui/icons-material";
import "../../../Css/Admin/Sidebar.css"
const Sidebar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin"); // Eğer token yoksa login sayfasına yönlendir
    }
  }, [navigate]);

  // Çıkış işlemi
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Token'ı sil
    navigate("/admin"); // Login sayfasına yönlendir
  };



  return (
    <div className="sidebar">
      <h2 className="logo">Library Manager</h2>
      <ul>
      <li onClick={() => navigate("/dashboard")}>
          <Home /> Dashboard
        </li>
        <li onClick={() => navigate("/dashboard/reservations")}>
        <History/>Rezervasyonlar
        </li>
        <li onClick={() => navigate("/dashboard/users")}>
          <Group /> Üyeler
        </li>
        <li>
          <AdminPanelSettings /> Adminler
        </li>
        <li onClick={() => navigate("/dashboard/books")}>
          <Book /> Kitaplar
        </li>
        <li onClick={() => navigate("/dashboard/logs")}>
        <History/>Log Kayıtları
        </li>
      </ul>
      <div className="logout" onClick={handleLogout}>
        <Logout /> Çıkış Yap
      </div>
    </div>
  );
};

export default Sidebar;

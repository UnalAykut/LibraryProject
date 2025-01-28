import React, { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material"; // Kullanıcı simgesi için MUI ikonu kullanıyoruz
import "../../../Css/Admin/DashboardHeader.css"; // CSS'yi ayrı dosyada saklayabilirsiniz
import { getAdminProfile } from "../../../Api/api"; // API fonksiyonu
const DashboardHeader = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const data = await getAdminProfile();
        console.log("Admin Profil:", data); // API çağrısı
        setAdminName(data.username); // Admin adını state'e kaydet
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    fetchAdminProfile();
  }, []);
  return (
    <header className="dashboard-header">
      <div className="admin-info">
        <AccountCircle className="user-icon" />
        <span className="admin-name">{adminName}</span>
      </div>
    </header>
  );
};

export default DashboardHeader;


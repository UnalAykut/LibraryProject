// src/Dashboard.js

import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
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
    navigate("/"); // Login sayfasına yönlendir
  };

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

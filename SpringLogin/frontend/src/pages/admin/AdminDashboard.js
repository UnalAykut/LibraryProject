import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Doğru yol olduğundan emin olun
import DashboardHeader from "./components/DashboardHeader";
//import DashboardContent from "./components/DashboardContent";
import "../../Css/Admin/Dashboard.css";  // CSS dosyasını doğru import edin

function LibraryDashboard() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <DashboardHeader />
        <Outlet /> {/* Dinamik içerik */}
      </main>
    </div>
  );
}

export default LibraryDashboard;

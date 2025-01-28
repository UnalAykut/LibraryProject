import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import { getMembersCount, getBooksCount, getBorrowedBooksCount } from "../../../Api/api";
const DashboardContent = () => {
   // Backend'den gelecek veriler için state
   const [stats, setStats] = useState({
    members: 0,
    books: 0,
    borrowed: 0,
  });
  console.log("Stored Token:", localStorage.getItem("authToken"));
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // API'den verileri çek
        const membersData = await getMembersCount();
        const booksData = await getBooksCount();
        const borrowedData = await getBorrowedBooksCount();
  
        // Verileri state'e set et
        setStats({
          members: membersData.count,
          books: booksData.count,
          borrowed: borrowedData.count,
        });
      } catch (error) {
        if (error.response) {
          console.error("Backend Hatası:", error.response.data);
          console.error("Status Kodu:", error.response.status);
        } else if (error.request) {
          console.error("İstek Gönderildi Ama Yanıt Alınamadı:", error.request);
        } else {
          console.error("Hata:", error.message);
        }
      }
    };
  
    fetchStats();
  }, []);
   // İlk yüklemede çalıştır



  return (
    <div className="dashboard-content">
      <div className="stats-container">
        <StatCard
          title="Toplam Üye"
          value={stats.members} // API'den gelen üye sayısı
          description="Aktif üyeler"
          color="#FFA500"
        />
        <StatCard
          title="Kitap Sayısı"
          value={stats.books} // API'den gelen kitap sayısı
          description="Toplam kitaplar"
          color="#00BFFF"
        />
        <StatCard
          title="Ödünç Alınan Kitaplar"
          value={stats.borrowed} // API'den gelen ödünç alınan kitap sayısı
          description="Kitap ödünç alındı"
          color="#32CD32"
        />
      </div>
    </div>
  );
};

export default DashboardContent;

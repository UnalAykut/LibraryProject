import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Navbar bileşeni
import { userGetAllMyReservations } from "../../../Api/api"; // API fonksiyonu
import "../../../Css/user/Reservation.css"; // CSS dosyası

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

   useEffect(() => {
      document.body.classList.add("homepage-background");
      return () => {
        document.body.classList.remove("homepage-background");
      };
    }, []);

  useEffect(() => {
    // Kullanıcının rezervasyonlarını API'den çekme
    const fetchReservations = async () => {
      try {
        const data = await userGetAllMyReservations();
        setReservations(data);
      } catch (err) {
        console.error("Hata: ", err);
        setError("Rezervasyonlar alınırken bir hata oluştu.");
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="reservations-container">
      {/* Navbar - Aktif sayfa vurgulanıyor */}
      <Navbar activePage="reservations" />

      <h1 className="reservations-title">Rezervasyonlarım</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="reservations-list">
        {reservations.length > 0 ? (
          reservations.map((reservation, index) => (
            <div key={index} className={`reservation-card ${reservation.status && reservation.status.toLowerCase() === "gecikmiş" ? "overdue" : "active"}`}>
              <h2 className="book-title">{reservation.bookTitle}</h2>
              <p><strong>Rezervasyon Tarihi:</strong> {reservation.reservationDate}</p>
              <p><strong>İade Tarihi:</strong> {reservation.dueDate}</p>
              <p><strong>Durum:</strong>               <p><strong>İade Tarihi:</strong> {reservation.dueDate}</p>
              </p>
              {reservation.overdueDays > 0 && (
                <p><strong>Gecikme Süresi:</strong> {reservation.overdueDays} gün</p>
              )}
              {reservation.currentPenalty > 0 && (
                <p><strong>Ceza:</strong> {reservation.currentPenalty} ₺</p>
              )}
              {reservation.daysLeft > 0 && (
                <p><strong>Kalan Gün:</strong> {reservation.daysLeft} gün</p>
              )}
              <p><strong>Uzatma Sayısı:</strong> {reservation.extensionCount}</p>
            </div>
          ))
        ) : (
          <p>Henüz rezervasyon yapılmamış.</p>
        )}
      </div>
    </div>
  );
};

export default Reservations;

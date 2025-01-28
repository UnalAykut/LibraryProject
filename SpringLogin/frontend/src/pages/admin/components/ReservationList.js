import React, { useEffect, useState } from "react";
import {
  getAllReservations, // Backend API fonksiyonu
  createReservation,// Yeni rezervasyon oluşturma fonksiyonu
  getUserById, //idye göre kullanıcı  idleri isimleri ile birlikte kullanmak için
  getBookById, //idye göre kitap idleri kitapm isimleri ile birlikte kullanmak için
} from "../../../Api/api"; // API çağrıları için gerekli fonksiyonlar
import "../../../Css/Admin/ReservationList.css"; // CSS dosyası
import AddIcon from "@mui/icons-material/Add"; // Artı simgesi
import ReservationModal from "./modals/ReservationModal"; // Yeni rezervasyon ekleme modalı

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(5); // Sayfa başına gösterilecek rezervasyon sayısı
  const [showAddModal, setShowAddModal] = useState(false); // Yeni rezervasyon modalı
  const [loading, setLoading] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({}); // Rezervasyon detayları

// Her rezervasyon için kullanıcı ve kitap bilgilerini getir
const fetchReservationDetails = async (reservations) => {
    const details = {};
    for (const reservation of reservations) {
      try {
        const [user, book] = await Promise.all([
          getUserById(reservation.userId), // Kullanıcı bilgisi
          getBookById(reservation.bookId), // Kitap bilgisi
        ]);
        details[reservation.reservationId] = {
          userName: user.username,
          bookTitle: book.title,
        };
      } catch (error) {
        console.error(
          `Kullanıcı ID: ${reservation.userId} veya Kitap ID: ${reservation.bookId} bilgisi alınamadı.`,
          error
        );
      }
    }
    setReservationDetails(details); // Rezervasyon detaylarını state'e kaydet
  };

  // Rezervasyonları backend'den getir
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const data = await getAllReservations(); // Backend'den rezervasyon verilerini getir
        await fetchReservationDetails(data);
        const sortedReservations = data.sort((a, b) => a.reservationId - b.reservationId); // ID'ye göre sıralama
        setReservations(sortedReservations);
      } catch (error) {
        console.error("Rezervasyonlar alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

  const totalPages = Math.ceil(reservations.length / reservationsPerPage);

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

  // Yeni rezervasyon oluşturma
  const handleAddReservation = async (newReservation) => {
    try {
      const addedReservation = await createReservation(newReservation); // Backend'e yeni rezervasyon gönder
      setReservations((prevReservations) => [...prevReservations, addedReservation]); // Yeni rezervasyonu listeye ekle
      setShowAddModal(false); // Modalı kapat
    } catch (error) {
      console.error("Yeni rezervasyon eklenemedi:", error);
    }
  };

  return (
    <div className="reservation-list">
      <div className="reservation-list-header">
        <h1>Rezervasyon Listesi</h1>
        <button className="add-reservation-button" onClick={() => setShowAddModal(true)}>
          <AddIcon className="add-icon" /> Rezervasyon Oluştur
        </button>
      </div>

      {/* Rezervasyon Tablosu */}
      <table>
        <thead>
          <tr>
            <th>Rezervasyon ID</th>
            <th>Kullanıcı ID</th>
            <th>Kullanıcı Adı</th>
            <th>Kitap ID</th>
            <th>Kitap Adı</th>
            <th>Rezervasyon Tarihi</th>
            <th>İade Tarihi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7">Yükleniyor...</td>
            </tr>
          ) : currentReservations.length > 0 ? (
            currentReservations.map((reservation) => (
              <tr key={reservation.reservationId}>
                <td>{reservation.reservationId}</td>
                <td>{reservation.userId}</td>
                <td>{reservationDetails[reservation.reservationId]?.userName || "Yükleniyor..."}</td>
                <td>{reservation.bookId}</td>
                <td>{reservationDetails[reservation.reservationId]?.bookTitle || "Yükleniyor..."}</td>
                <td>{reservation.reservationDate}</td>
                <td>{reservation.dueDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Rezervasyon bulunamadı.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Sayfalama */}
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          className="pagination-button"
          disabled={currentPage === 1}
        >
          &laquo; Geri
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className="pagination-button"
          disabled={currentPage === totalPages}
        >
          İleri &raquo;
        </button>
      </div>

      {/* Yeni Rezervasyon Modalı */}
      <ReservationModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddReservation}
      />
    </div>
  );
};

export default ReservationList;

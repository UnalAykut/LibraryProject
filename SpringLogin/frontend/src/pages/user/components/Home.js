import React, { useEffect, useState } from "react";
import { userGetAllBooks,userReserveBook } from "../../../Api/api";
import Navbar from "../components/Navbar"; // Navbar'ı içe aktar
import "../../../Css/user/Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    document.body.classList.add("homepage-background");
    return () => {
      document.body.classList.remove("homepage-background");
    };
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await userGetAllBooks();
        console.log("API'den Gelen Veri:", data); 
        setBooks(data);
      } catch (err) {
        console.error("Hata: ", err);
        setError("Kitaplar alınırken bir hata oluştu.");
      }
    };
    fetchBooks();
  }, []);

  // Kitabı rezerve etme fonksiyonu
  const handleReserve = async (bookId) => {
    try {
      await userReserveBook(bookId); // Güncellenmiş fonksiyon çağırılıyor
      alert("Kitap başarıyla rezerve edildi!");
    } catch (error) {
      alert("Rezerve edilirken bir hata oluştu!");
    }
  };

  

  return (
    <div className="user-home-container">
      
      {/* Navbar Component'i burada */}
      <Navbar />

      {/* Kitap Listesi */}
      {error && <p className="user-error-message">{error}</p>}
      <div className="user-books-list">
        {books && books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="user-book-card">
              {book.imageUrl && (
                <div className="user-book-image">
                  <img
                    src={require(`../../../images/books/${book.imageUrl}`)}
                    alt={book.title}
                  />
                </div>
              )}
              <div className="user-book-details">
                <h2 className="user-book-title">{book.title}</h2>
                <p className="user-book-author">
                  <strong>Yazar:</strong> {book.author}
                </p>
                <p className="user-book-genre">
                  <strong>Tür:</strong> {book.genre}
                </p>
                <p className="user-book-description">{book.description}</p>
              </div>
              {/* Rezerve Et butonu */}
              <div className="user-reserve-container">
                <button className="user-reserve-button"
                onClick={()=>handleReserve(book.id)}
                >
                  <i className="bx bx-book-alt"></i> Rezerve Et
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Henüz kitap eklenmemiş.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

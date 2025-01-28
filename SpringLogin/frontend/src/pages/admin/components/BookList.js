import React, { useEffect, useState } from "react";
import { getAllBooks, deleteBookById,updateBookById, getBookById,addBook} from "../../../Api/api"; // Backend API fonksiyonu
import "../../../Css/Admin/BookList.css"; // CSS dosyası
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal"; // Modal bileşenini içe aktar
import EditBookModal from "./modals/EditBookModal";
import AddIcon from "@mui/icons-material/Add"; // Artı simgesi
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(4);
  const [showModal, setShowModal] = useState(false); // Modal gösterimi
  const [selectedBook, setSelectedBook] = useState(null); // Silinecek kitap
  const [expandedId, setExpandedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); // Düzenleme modalı gösterimi
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null); // Düzenlenecek kitap
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks(); // Backend'den kitap verilerini getirir
        const sortedBooks = data.sort((a, b) => a.id - b.id); // ID'ye göre artan sıralama
        setBooks(sortedBooks);
        setFilteredBooks(sortedBooks);
      } catch (error) {
        console.error("Kitaplar alınamadı:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) => {
      const matchesTitle = book.title
        ? book.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true;
      const matchesAuthor = book.author
        ? book.author.toLowerCase().includes(searchAuthor.toLowerCase())
        : true;
      const matchesGenre = book.genre
        ? book.genre.toLowerCase().includes(searchGenre.toLowerCase())
        : true;

      return matchesTitle && matchesAuthor && matchesGenre;
    });

    setFilteredBooks(filtered);
    setCurrentPage(1); // Filtreleme sonrası sayfa sıfırlanır
  }, [searchTitle, searchAuthor, searchGenre, books]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

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
  const handleDelete = async (id) => {
      try {
        await deleteBookById(id); // Kullanıcıyı API'den sil
        setBooks(books.filter((book) => book.id !== id)); // Kullanıcıyı state'den kaldır
        setShowModal(false);
      } catch (error) {
        console.error("Kullanıcı silinemedi:", error);
      }
    };
    const openModal = (book) => {
        setSelectedBook(book);
        setShowModal(true);
      };

      // Kitap düzenleme modunu aç
      const openEditModal = async (bookId) => {
        try {
          const bookDetails = await getBookById(bookId);
          setBookToEdit(bookDetails);
          setShowEditModal(true);
        } catch (error) {
          console.error("Kitap bilgileri alınamadı:", error);
        }
      };
  // Kitap ekleme modunu aç
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const handleAddNewBook = async (newBook) => {
    try {
      // Gönderilen kitap verisinden `id` alanını kaldırıyoruz
      const { id, ...bookDataWithoutId } = newBook;
  
      // API'ye sadece gerekli verileri gönder
      const addedBook = await addBook(bookDataWithoutId);
  
      // Yeni kitabı listeye ekle
      setBooks((prevBooks) => [...prevBooks, addedBook]);
  
      // Modalı kapat
      setShowAddModal(false);
    } catch (error) {
      console.error("Yeni kitap eklenemedi:", error);
    }
  };
  

      const handleSaveBook = async (updatedBook) => {
        try {
          // Backend'e istekte bulunun (updateBookById yazmanız gerekiyor)
          await updateBookById(updatedBook); // Kitabı güncelleyen API çağrısı
      
          // State'i güncelle
          setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
          );
          setShowEditModal(false); // Modalı kapat
        } catch (error) {
          console.error("Kitap güncellenemedi:", error);
        }}
/*
  const handleEdit = (id) => {
    // Düzenleme işlemi için yönlendirme veya modal açma gibi bir işlem yapabilirsiniz
    console.log(`Kullanıcı ${id} düzenleniyor...`);
    // Örneğin bir düzenleme formunu açabilirsiniz
  };*/
  
//Metin kesmke için 
const truncateText = (text, maxLength, id) => {
  if (id === expandedId) return text; // Eğer açıklama genişletildiyse tüm metni göster
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

  return (
    <div className="book-list">
      <div className="book-list-header">
      <h1>Kitap Listesi</h1>
      <button className="add-book-button" onClick={openAddModal}>
      <AddIcon className="add-icon" /> Kitap Ekle
      </button>
      </div>
      {/* Filtreleme Alanı */}
      <div className="filters">
        <input
          type="text"
          placeholder="Kitap adına göre ara"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Yazara göre ara"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Türüne göre ara"
          value={searchGenre}
          onChange={(e) => setSearchGenre(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Kitap Tablosu */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Resim</th>
            <th>Kitap Adı</th>
            <th>Yazar</th>
            <th>Tür</th>
            <th>Açıklama</th>
            <th>Stok</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>
                <img
                  src={require(`../../../images/books/${book.imageUrl}`)}
                  alt={book.title}
                  className="book-image"
                />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>
                {truncateText(book.description, 50, book.id)}{" "}
                {book.description.length > 50 && (
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === book.id ? null : book.id)
                    }
                    className="see-more-button"
                  >
                    {expandedId === book.id ? "Gizle" : "Tamamını Gör"}
                  </button>
                )}
              </td>
              <td>{book.stock}</td>
              <td>
                <button
                  onClick={() => openEditModal(book.id)}
                  className="edit-button"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => openModal(book)}
                  className="delete-button"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
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
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
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
       {/* Modal Bileşeni */}
       <DeleteConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDelete(selectedBook.id)}
        message={`ID: ${selectedBook?.id} ve Kitap adı: ${selectedBook?.title} olan kitap'ı silmek istediğinizden emin misiniz?`}
      />
      <EditBookModal
        show={showEditModal}
        book={bookToEdit}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveBook}
      />
      <EditBookModal
        show={showAddModal}
        book={null}// Yeni kitap eklerken bir kitap gönderilmez
        onClose={() => setShowAddModal(false)}
        onSave={handleAddNewBook}
        isEditMode={false}
      />
    </div>
  );
};

export default BookList;

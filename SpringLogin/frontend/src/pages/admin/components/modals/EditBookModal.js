import React, { useState, useEffect } from "react";
import "../../../../Css/Admin/EditBookModal.css"; // Modal için CSS dosyası

const EditBookModal = ({ show, book, onClose, onSave,isEditMode }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  // Modal her açıldığında veya book değiştiğinde input değerlerini güncelle
  useEffect(() => {
    if (isEditMode && book) {
      // Düzenleme modundaysa, kitap bilgilerini state'e yükle
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setGenre(book.genre || "");
      setDescription(book.description || "");
      setStock(book.stock || 0);
      setImageUrl(book.imageUrl || "");
    } else {
      // Kitap ekleme modundaysa, alanları temizle
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
      setStock(0);
      setImageUrl("");
    }
  }, [book, isEditMode]);

  if (!show) return null;

  const handleSave = () => {
    const newBookData = {
      title,
      author,
      genre,
      description,
      stock,
      imageUrl,
    };

    if (isEditMode && book) {
      // Düzenleme modundaysa, mevcut kitabın ID'sini koru
      newBookData.id = book.id;
    }

    onSave(newBookData); // Düzenlenen veya yeni kitap bilgilerini gönder
  };

  return (
    <div className="edit-book-modal-overlay">
      <div className="edit-book-modal-content">
        <h2>{isEditMode ? "Kitap Düzenle" : "Yeni Kitap Ekle"}</h2>
        <form>
          <label>
            Kitap Adı:
            <input
              type="text"
              value={title}
              placeholder={book?.title || "Kitap adı"}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Yazar:
            <input
              type="text"
              value={author}
              placeholder={book?.author || "Kitap yazarı"}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label>
            Tür:
            <input
              type="text"
              value={genre}
              placeholder={book?.genre || "Kitap türü"}
              onChange={(e) => setGenre(e.target.value)}
            />
          </label>
          <label>
            Açıklama:
            <textarea
              value={description}
              placeholder={book?.description || "Kitap açıklaması"}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Stok:
            <input
              type="number"
              value={stock}
              placeholder={book?.title || "Kitap stock sayısı"}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </label>
          <label>
            Görsel URL:
            <input
              type="text"
              value={imageUrl}
              placeholder={book?.imageUrl || "Kitap resim yolu"}
              onChange={(e) => setImageUrl(e.target.value)}
            />
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

export default EditBookModal;

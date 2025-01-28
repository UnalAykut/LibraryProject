import React from "react";
import "../../../../Css/Admin/DeleteConfirmModal.css"; // CSS dosyasını burada tanımlayabilirsiniz

const DeleteConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null; // Modal gösterilmeyecekse hiçbir şey döndürme

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Onay</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="cancel-button">
            İptal
          </button>
          <button onClick={onConfirm} className="confirm-button">
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

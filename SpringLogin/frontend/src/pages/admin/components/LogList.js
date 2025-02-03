import React, { useEffect, useState } from "react";
import { getAllLogs } from "../../../Api/api"; // Backend API fonksiyonu
import "../../../Css/Admin/LogList.css"; // CSS dosyası
import Info from "@mui/icons-material/Info";
import {
  Search,
  AddCircle,
  Edit,
  Delete,
  Group,
  Book,
  AdminPanelSettings,
  History,
  Event
} from "@mui/icons-material";
const LogList = () => {
  const [logs, setLogs] = useState([]); // Tüm loglar
  const [filteredLogs, setFilteredLogs] = useState([]); // Filtrelenmiş loglar
  const [searchAction, setSearchAction] = useState(""); // İşlem türüne göre arama
  const [searchEntity, setSearchEntity] = useState(""); // Entity adına göre arama
  const [searchAdmin, setSearchAdmin] = useState(""); // Admin adına göre arama
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa
  const [logsPerPage] = useState(8); // Sayfa başına log sayısı

  // Backend'den logları al
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAllLogs(); // Backend'den log verilerini al
        const sortedLogs = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp) // Tarihe göre azalan sıralama
        );
        setLogs(sortedLogs);
        setFilteredLogs(sortedLogs);
      } catch (error) {
        console.error("Loglar alınamadı:", error);
      }
    };

    fetchLogs();
  }, []);

  // Filtreleme
  useEffect(() => {
    const filtered = logs.filter((log) => {
      const matchesAction = log.action
        ? log.action.toLowerCase().includes(searchAction.toLowerCase())
        : true;
      const matchesEntity = log.entityName
        ? log.entityName.toLowerCase().includes(searchEntity.toLowerCase())
        : true;
      const matchesAdmin = log.performedBy
        ? log.performedBy.toLowerCase().includes(searchAdmin.toLowerCase())
        : true;
  
      return matchesAction && matchesEntity && matchesAdmin;
    });

    setFilteredLogs(filtered);
    setCurrentPage(1); // Filtreleme sonrası sayfayı sıfırla
  }, [searchAction, searchEntity,searchAdmin, logs]);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

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
//Log işlmelerinin görselleri için
  const getLogIcon = (action, entityName) => {
    switch (action) {
      case "GET":
        return <Search style={{ color: "blue" }} />;
      case "POST":
        return <AddCircle style={{ color: "green" }} />;
      case "PUT":
        return <Edit style={{ color: "orange" }} />;
      case "DELETE":
        return <Delete style={{ color: "red" }} />;
      default:
        return <History style={{ color: "gray" }} />;
    }
  };
  
  const getEntityIcon = (entityName) => {
    switch (entityName) {
      case "User":
        return <Group style={{ color: "purple" }} />;
      case "Book":
        return <Book style={{ color: "brown" }} />;
      case "Admin":
        return <AdminPanelSettings style={{ color: "teal" }} />;
      case "Reservation":
        return <Event style={{ color: "green" }} />;
      default:
        return <Info style={{ color: "black" }} />;
    }
  };

  return (
    <div className="log-list">
      <h1>Log Listesi</h1>

      {/* Filtreleme Alanı */}
      <div className="filters">
        <input
          type="text"
          placeholder="İşlem türüne göre ara (GET, POST, PUT, DELETE)"
          value={searchAction}
          onChange={(e) => setSearchAction(e.target.value)}
          className="search-input"
        />
         <input
           type="text"
           placeholder="Admin adına göre ara"
           value={searchAdmin}
           onChange={(e) => setSearchAdmin(e.target.value)}
           className="search-input"
        />
        <input
          type="text"
          placeholder="Entity adına göre ara (Book, User)"
          value={searchEntity}
          onChange={(e) => setSearchEntity(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Log Tablosu */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>İşlem</th>
            <th>Entity Adı</th>
            <th>Entity ID</th>
            <th>Yapan Admin</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log) => (
            <tr key={log.id}>
               <td>{log.id}</td>
               <td>
                  <div className="action-info">
                    {getLogIcon(log.action)} {/* İkon */}
                    {log.action} {/* İşlem ismi */}
                  </div>
               </td>
               <td>
                  <div className="entity-info">
                    {getEntityIcon(log.entityName)} {/* İkon */}
                    <span className="entity-name">{log.entityName}</span> {/* Entity adı */}
                  </div>
               </td>
               <td>{log.entityId || "-"}</td>
               <td>
                  <div className="admin-info">
                    {getEntityIcon("Admin")} {/* Admin İkonu */}
                    <span>{log.performedBy}</span> {/* Admin İsmi */}
                  </div>
               </td>
               <td>{new Date(log.timestamp).toLocaleString()}</td>
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
  {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
    const pageIndex = currentPage <= 6 ? index + 1 : currentPage - 5 + index; // Dinamik gösterim
    if (pageIndex > totalPages) return null; // Toplam sayfa sayısını aşmasın
    return (
      <button
        key={pageIndex}
        onClick={() => handlePageClick(pageIndex)}
        className={`pagination-button ${currentPage === pageIndex ? "active" : ""}`}
      >
        {pageIndex}
      </button>
    );
  })}
  <button
    onClick={handleNextPage}
    className="pagination-button"
    disabled={currentPage === totalPages}
  >
    İleri &raquo;
  </button>
</div>
    </div>
  );
};

export default LogList;

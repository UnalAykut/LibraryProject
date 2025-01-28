import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import LibraryDashboard from "./pages/admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute"; // PrivateRoute bileşenini import edin
import AdminLogin from "./pages/admin/AdminLogin";
import UserList from "./pages/admin/components/UserList";
import BookList from "./pages/admin/components/BookList";
import DashboardContent from "./pages/admin/components/DashboardContent"; 
import LogList from "./pages/admin/components/LogList";
import ReservationList from "./pages/admin/components/ReservationList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        {/* Dashboard sayfası PrivateRoute ile korunuyor */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <LibraryDashboard/>
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardContent />} /> {/* Ana Dashboard İçeriği */}
          <Route path="users" element={<UserList />} /> {/* Kullanıcı Listesi */}
          <Route path="books" element={<BookList />} /> {/* Kitap Listesi */}
          <Route path="logs" element={<LogList/>} /> {/* Log Listesi */}
          <Route path="reservations" element={<ReservationList/>} /> {/* Log Listesi */}
          </Route>
        <Route path="/admin" element={<AdminLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;

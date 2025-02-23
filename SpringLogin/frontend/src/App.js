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
import Home from "./pages/user/components/Home";
import Reservations from "./pages/user/components/Reservation";
import Account from "./pages/user/components/Account";
function App() {
  return (
    <Router>
      <Routes>
        {/* Giriş sayfası */}
        <Route path="/" element={<Login />} />
        
        {/* Kullanıcıların giriş yaptıktan sonra yönlendirileceği Home sayfası */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route path="reservation" element={<Reservations />} /> {/* Kullanıcı Listesi */}
        <Route path="account" element={<Account />} />
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
          <Route path="logs" element={<LogList />} /> {/* Log Listesi */}
          <Route path="reservations" element={<ReservationList />} /> {/* Rezervasyon Listesi */}
        </Route>

        {/* Admin Giriş Sayfası */}
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute bileşeni: Kullanıcı giriş yapmadıysa login sayfasına yönlendirir
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // JWT token'ı localStorage'dan al

  if (!token) {
    return <Navigate to="/admin" />; // Token yoksa login sayfasına yönlendir
  }

  return children; // Token varsa sayfayı göster
}

export default PrivateRoute;

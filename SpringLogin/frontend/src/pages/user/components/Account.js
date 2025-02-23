import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserProfile, updateUserProfile } from "../../../Api/api";
import "../../../Css/user/Account.css";

const Account = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    oldPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
        document.body.classList.add("homepage-background");
        return () => {
          document.body.classList.remove("homepage-background");
        };
      }, []);

  // Kullanıcı bilgilerini API'den çekme
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile({
          username: data.username,
          email: data.email,
          password: "",
          oldPassword: "",
        });
      } catch (err) {
        setError("Profil bilgileri yüklenirken hata oluştu.");
      }
    };

    fetchProfile();
  }, []);

  // Form değişikliklerini işleme
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Profil güncelleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await updateUserProfile(profile);
      setMessage("Profil başarıyla güncellendi!");
      setProfile({ ...profile, password: "", oldPassword: "" }); // Şifreleri sıfırla
    } catch (err) {
      setError("Güncelleme başarısız! Eski şifrenizi doğru girdiğinizden emin olun.");
    }
  };

  return (
    <div className="account-container">
      <Navbar activePage="account" />
      <h1 className="account-title">Hesabım</h1>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form className="account-form" onSubmit={handleSubmit}>
        <label>Kullanıcı Adı:</label>
        <input type="text" name="username" value={profile.username} onChange={handleChange} required />

        <label>E-posta:</label>
        <input type="email" name="email" value={profile.email} onChange={handleChange} required />

        <label>Eski Şifre:</label>
        <input type="password" name="oldPassword" value={profile.oldPassword} onChange={handleChange} required />

        <label>Yeni Şifre:</label>
        <input type="password" name="password" value={profile.password} onChange={handleChange} required />

        <button type="submit" className="update-button">Güncelle</button>
      </form>
    </div>
  );
};

export default Account;

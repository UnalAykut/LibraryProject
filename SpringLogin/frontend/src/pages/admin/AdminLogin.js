import React, {useState} from "react";
import "../../Css/Admin/AdminLogin.css"; // CSS dosyasını içe aktarıyoruz
import { adminLogin } from "../../Api/api";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate()

const handleAdminLogin = async (event) => {
    event.preventDefault();
    try{
     const data = await adminLogin(username,password);
        localStorage.setItem("authToken",data.token); //Gelen tokeni kaydet
        navigate("/dashboard");
        alert("Login successful!");
        }catch(error){
           alert("Login failed:"+error);
        }   
}
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleAdminLogin}>
          <h1 className="admin-title">Admin Paneli</h1>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Admin"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button login__submit">
              <span className="button__text">Giriş Yap</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState, useEffect } from "react";
import { initLinks } from "../../utils/formTransitions"; // initLinks fonksiyonunu import ediyoruz
import "../../Css/Login/Login.css"
import { useNavigate } from "react-router-dom";
import { login, register } from "../../Api/api";
function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  useEffect(() => {
    // Sayfa render edildikten sonra initLinks fonksiyonunu çalıştırıyoruz
    initLinks(isLogin);
  }, [isLogin]);

   // Login/SignUp formu geçişi
   const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  // Login işlemi
  const handleLogin = async (event)=>{
    event.preventDefault();
    try{
      const data = await login(username,password);
      localStorage.setItem("authToken",data.token); //Gelen tokeni kaydet
      navigate("/home");
      alert("Login successful!");
    }catch(error){
      alert("Login failed:"+error);
    }
  }
  //const encodedEmail = encodeURIComponent(email);
  // Sign Up işlemi
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const data = await register(username, email, password);
      alert("Sign up successful: " + data);
      setIsLogin(true); // Login formuna geçiş
    } catch (error) {
      alert("Sign up failed: " + error);
    }
  };

  const wrapperClass = isLogin ? "wrapper" : "wrapper active"; 


  return (
    <div className="bodyLogin">
    <div className={wrapperClass}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      {/* Login Formu */}
      {isLogin ? (
        <div className="form-box login">
          <h2 className="title animation" style={{ "--i": 0, "--j": 21 }}>
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box animation" style={{ "--i": 2, "--j": 23 }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn animation" style={{ "--i": 3, "--j": 24 }}>
              Login
            </button>

            <div className="linkTxt animation" style={{ "--i": 5, "--j": 25 }}>
              <p>
                Don't have an account?{" "}
                <span className="register-link" onClick={toggleForm}>
                  <span>Sign Up</span>
                </span>
              </p>
            </div>
          </form>
        </div>
      ) : (
        // SignUp Formu
        <div className="form-box register">
          <h2 className="title animation" style={{ "--i": 17, "--j": 0 }}>
            Sign Up
          </h2>
          <form onSubmit={handleSignUp}>
            <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
              <i className="bx bxs-envelope"></i>
            </div>

            <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn animation" style={{ "--i": 21, "--j": 4 }}>
              Sign Up
            </button>

            <div className="linkTxt animation" style={{ "--i": 22, "--j": 5 }}>
              <p>
                Already have an account?{" "}
                <span className="login-link" onClick={toggleForm}>
                  <span>Login</span>
                </span>
              </p>
            </div>
          </form>
        </div>
      )}

      {/* Info Text */}
      <div className={isLogin ? "info-text login" : "info-text register"}>
  <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
    {isLogin ? "Kütüphanemize Hoş Geldiniz!" : "Kitaplarla Tanışın!"}
  </h2>
  <p className="animation" style={{ "--i": 1, "--j": 21 }}>
    {isLogin
      ? "Bilgilerin dünyasına adım atmaya hazır mısınız? Yeni keşifler yapmaya başlamak için giriş yapın."
      : "Kütüphanemizin dünyasında sizi bekleyen çok şey var. Hemen kaydolun ve keşfe başlayın!"}
  </p>
</div>

    </div>
    </div>
  );
}

export default Login;

# 📚 Library Management System

Bu proje, bir **Kütüphane Yönetim Sistemi** olup, kullanıcıların kitapları listeleyebildiği, rezervasyon yapabildiği ve hesap bilgilerini yönetebildiği bir sistemdir. **Adminler**, kullanıcıları, kitapları ve rezervasyonları yönetebilir, ayrıca sistem loglarını görüntüleyebilir.

---

## 🚀 Proje Özellikleri

### ✅ Kullanıcı Özellikleri:
- Kullanıcılar **kayıt olabilir ve giriş yapabilir** (JWT Authentication).
- Sisteme giriş yapan kullanıcılar:
  - 📖 **Kitapları listeleyebilir** 
  - 📌 **Kitap rezervasyonu yapabilir** 
  - 🔐 **Hesap bilgilerini yönetebilir** 
  - 🗂️ **Rezervasyonlarını görüntüleyebilir** 

### ✅ Admin Özellikleri:
- Admin sisteme giriş yapabilir ve:
  - 🛠️ **Kullanıcıları listeleyebilir, düzenleyebilir ve silebilir** 
  - 📚 **Kitapları ekleyebilir, düzenleyebilir ve silebilir** 
  - 📅 **Rezervasyonları yönetebilir** 
  - 📜 **Sistem işlemlerinin log kayıtlarını görüntüleyebilir** 

---

## 🛠️ Kullanılan Teknolojiler

### 🖥️ Backend:
- **Java Spring Boot** ☕
- **Spring Security (JWT Token Authentication)**
- **Spring Data JPA (H2, PostgreSQL veya MySQL desteği)**
- **JUnit (Testler için)**
- **Swagger (API Dokümantasyonu için)**
- **Mimari**: Layered Architecture (Controller - Service - Repository - DTO - Model - Security)

### 🌐 Frontend:
- **React.js** ⚛️
- **HTML / CSS / JavaScript**
- **React Router (Sayfa yönlendirmeleri için)**

---

## 📂 Proje Yapısı

### 🔹 Backend Yapısı (`src/main/java/com/library`)

```plaintext
📂 port
 └── ReservationDataPort.java

📂 repository
 ├── BookRepository.java
 ├── ReservationRepository.java
 └── UserRepository.java

📂 security
 ├── CustomHttpFirewall.java
 ├── JwtAuthenticationFilter.java
 └── JwtTokenProvider.java

📂 service
 ├── AdminService.java
 ├── BookService.java
 ├── ReservationService.java
 └── UserService.java

📂 adapter
 └── ReservationRepositoryAdapter.java

📂 config
 ├── CorsConfig.java
 ├── SecurityConfig.java
 ├── SwaggerConfig.java
 └── WebConfig.java

📂 controller
 ├── AdminAuthController.java
 ├── AdminBookController.java
 ├── AdminUserController.java
 ├── ReservationController.java
 ├── UserAuthController.java
 └── UserBookController.java

📂 dto
 ├── AdminProfileResponseDto.java
 ├── AuthResponse.java
 ├── BookAdminDto.java
 ├── BookUserDto.java
 ├── LoginRequest.java
 ├── RegisterRequest.java
 ├── ReservationAdminResponseDto.java
 ├── ReservationRequestDto.java
 ├── ReservationResponseDto.java
 └── UserDto.java

📂 model
 ├── Book.java
 ├── Reservation.java
 ├── Role.java
 └── User.java 
```

## 🔹 Frontend Yapısı (`src/`)

```plaintext
📂 Api
 └── api.js

📂 Css
 ├── 📂 Admin
 ├── 📂 Login
 └── 📂 User

📂 images
 ├── 📂 books (Kitap görselleri)
 ├── libraryLoginBG.png

📂 pages
 ├── 📂 admin
 │   ├── 📂 components
 │   │   ├── 📂 modals
 │   │   ├── BookList.js
 │   │   ├── DashboardContent.js
 │   │   ├── DashboardHeader.js
 │   │   ├── LogList.js
 │   │   ├── Sidebar.js
 │   │   ├── UserList.js
 │   │   ├── AdminDashboard.js
 │   │   └── Dashboard.js
 │   ├── AdminLogin.js
 │   └── Dashboard.js
 ├── 📂 user
 │   ├── 📂 components
 │   │   ├── Account.js
 │   │   ├── Home.js
 │   │   ├── Navbar.js
 │   │   ├── Reservation.js
 │   │   └── Login.js
 │   ├── utils
 │   │   ├── formTransitions.js
 │   ├── App.js
 │   ├── index.css
 │   ├── index.js
 │   ├── logo.svg
 │   └── PrivateRoute.js
``` 

## 🛡️ Güvenlik (Security)

- **JWT (JSON Web Token) Authentication** kullanıldı.
- **Spring Security** ile **rol bazlı erişim kontrolü** sağlandı (`ROLE_USER`, `ROLE_ADMIN`).
- **CORS Config** ile güvenli API erişimi sağlandı.
- **Şifreleme için BCrypt kullanıldı**.

---

## 🧪 Testler
- **JUnit kullanılarak testler yazıldı.(Kullalnıcı Giriş ve Kayıt Testleri)

---

# Projenin Ekran Görüntüleri:
 <div>
  <h2>Kullanıcı Giriş Sayfası</h2>
  <img src="Preview/1.png"/>
  <h2>Kullanıcı Kayıt Ol Sayfası</h2>
  <img src="Preview/2.png"/>
  <h2>Kullanıcı Girişi sonrası Anasayfa</h2>
  <img src="Preview/3.png"/>
  <img src="Preview/4.png"/>
  <h2>Kullanıcı Rezervasyonlarım Sayfası</h2>
  <img src="Preview/5.png"/>
  <h2>Kullanıcı Hesaplarını Düzenleyebildiği Sayfa</h2>
  <img src="Preview/6.png"/>
  <h2>Admin Giriş Sayfası</h2>
  <img src="Preview/7.png"/>
  <h2>Admin Girişi sonrası Dashboard</h2>
  <img src="Preview/8.png"/>
  <h2>Adminin Rezervasyonları Yönettiği Sayfa</h2>
  <img src="Preview/9.png"/>
  <h2>Adminin Rezervasyon Oluşturması</h2>
  <img src="Preview/10.png"/>
  <img src="Preview/11.png"/>
  <h2>Adminin Kullanıcıları Yönettiği Sayfa</h2>
  <img src="Preview/12.png"/>
  <h2>Adminin Kullanıcıyı Düzenleyebilmesi</h2>
  <img src="Preview/13.png"/>
  <h2>Adminin Kullanıcıyı Silmesi İçin Onay Mesajı</h2>
  <img src="Preview/14.png"/>
  <h2>Adminin Kitapları Yönettiği Sayfa</h2> 
  <img src="Preview/15.png"/>
  <h2>Adminin Kitap Düzenlemesi</h2>
  <img src="Preview/16.png"/>
  <h2>Adminin Kitap Eklemesi</h2>
  <img src="Preview/17.png"/>
  <h2>Adminin Kitap Silmesi İçin Onay Mesajı</h2>
  <img src="Preview/18.png"/>
  <h2>Adminin Log Kayıtlarını Listelemesi</h2>
  <img src="Preview/19.png"/>
  <h2>Post için Log Kayıtlarının Filtrelenmesi</h2>
  <img src="Preview/20.png"/>
  <h2>Delete için Log Kayıtlarının Filtrelenmesi</h2>
  <img src="Preview/21.png"/>
</div>



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





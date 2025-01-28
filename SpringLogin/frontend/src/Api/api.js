import axios from "axios";

const API_BASE_URL = "http://localhost:8081"; // Backend API base URL



// Authorization header oluştur
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  console.log("Authorization Header:", `Bearer ${token}`);
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Token'ı başlığa ekle
    },
  };
};



// Login işlemi
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, { username, password });
    return response.data; // Token veya diğer gerekli veriler
  } catch (error) {
    throw error.response.data; // Hata mesajını geri döndür
  }
};

// Sign Up işlemi
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, { username, email, password });
    return response.data; // Başarı mesajı veya gerekli veriler
  } catch (error) {
    throw error.response.data; // Hata mesajını geri döndür
  }
};

// Admin için Login işlemi
export const adminLogin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, { username, password });
    return response.data; // Token veya diğer gerekli veriler
  } catch (error) {
    throw error.response.data; // Hata mesajını geri döndür
  }
};


// Toplam üye sayısını al
export const getMembersCount = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/countUsers`, getAuthHeader());
  return response.data; // Axios, veriyi doğrudan response.data içinde döner
};

// Toplam kitap sayısını al
export const getBooksCount = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/countBooks`, getAuthHeader());
  return response.data;
};

// Ödünç alınan kitap sayısını al
export const getBorrowedBooksCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/reservationCount`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Hata oluştu:", error.response?.data || error.message);
    throw new Error("Ödünç alınan kitap sayısı alınamadı");
  }
};

// Admin profilini almak için API çağrısı
export const getAdminProfile = async () => {
  
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/profile`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Admin profil bilgisi alınamadı:", error.response?.data || error.message);
    throw new Error("Admin profil bilgisi alınamadı");
  }
};
//Kullanıcıları tümünü getir
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, getAuthHeader());
    return response.data; // Kullanıcı listesi
  } catch (error) {
    console.error("Kullanıcılar alınamadı:", error.response?.data || error.message);
    throw new Error("Kullanıcılar alınamadı");
  }
};
//Admin için Kullanıcı sil
export const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/user/${userId}`,getAuthHeader() );
    return response.data; // Başarı mesajını döndür
  } catch (error) {
    console.error("Kullanıcı silinemedi:", error.response?.data || error.message);
    throw new Error("Kullanıcı silinemedi");
  }
};
//Admin için tüm Kitaplar 
export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/books/getAll`,getAuthHeader() );
    return response.data;
  } catch (error) {
    console.error("Kitaplar alınamadı:", error);
    throw error;
  }
};

//Admin kitap silme
export const deleteBookById = async (bookId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/books/${bookId}`,getAuthHeader() );
    return response.data; // Başarı mesajını döndür
  } catch (error) {
    console.error("Kitap silinemedi:", error.response?.data || error.message);
    throw new Error("Kitap silinemedi");
  }
};
//Admin kullanıcı güncelleme
export const updateUserById = async (updatedUser) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/user/${updatedUser.id}`,updatedUser,getAuthHeader()
    );
    return response.data; // Güncellenen kullanıcıyı döndür
  } catch (error) {
    console.error("Kullanıcı güncellenemedi:", error.response?.data || error.message);
    throw new Error("Kullanıcı güncellenemedi.");
  }
}; 
//Admin İd ye göre kullanıcı getirme 
export const getUserById = async (userId) => {
try {
  const response = await axios.get(`${API_BASE_URL}/admin/user/${userId}`,getAuthHeader());
  return response.data;
} catch (error) {
  console.error("Kullanıcı  getirilemedi:", error.response?.data || error.message);
    throw new Error("Kullanıcı getirilemedi.");
}
}

//Admin İd ye göre Kitap düzenleme 
export const updateBookById = async (book) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/books/${book.id}`,book,getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Kitap  Düzenlenemedi:", error.response?.data || error.message);
      throw new Error("Kitap  Düzenlenemedi.");
  }
}

//Admin İd ye göre Kitap getirme 
export const getBookById = async (bookId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/books/${bookId}`,getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Kitap  getirilemedi:", error.response?.data || error.message);
      throw new Error("Kitap getirilemedi.");
  }
  }
  //Admin kitap ekleme
  export const addBook = async (bookdata) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/books`,bookdata,getAuthHeader());
      return response.data;
    } catch (error) {
      console.error("Kitap  Eklenemedi:", error.response?.data || error.message);
        throw new Error("Kitap Eklenemedi.");
    }
    }
  //Admin Log Kayıtlarını Listeleme
  export const getAllLogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/logs`,getAuthHeader());
      return response.data;
    } catch (error) {
      console.error("Loglar  getirilemedi:", error.response?.data || error.message);
        throw new Error("Loglar getirilemedi.");
    }
    }
    //Admin rezervasyonları listeleme
    export const getAllReservations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/reservations/all`,getAuthHeader());
        return response.data;
      } catch (error) {
        console.error("Rezervasyonlar  getirilemedi:", error.response?.data || error.message);
          throw new Error("Rezervasyonlar getirilemedi.");
      }
      }
      //Admin rezervasyonları Oluşturma
      export const createReservation = async (reservationData) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/admin/reservation`,reservationData,getAuthHeader());
          return response.data;
        } catch (error) {
          console.error("Rezervasyon Oluşturulamadı:", error.response?.data || error.message);
            throw new Error("Rezervasyonlar Oluşturulamadı.");
        }
        }

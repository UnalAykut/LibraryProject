package com.project.login.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAdminDto {
	private Long id;            // Kitap ID (Admin'in düzenlemesi için gerekli)
    private String title;       // Kitap adı
    private String author;      // Yazar adı
    private String genre;       // Tür
    private String description; // Kitap açıklaması
    private int stock;          // Stok durumu
    private String imageUrl;    // Resim URL
}

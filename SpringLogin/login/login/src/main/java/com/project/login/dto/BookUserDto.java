package com.project.login.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookUserDto {
	private String title;       // Kitap adı
    private String author;      // Yazar adı
    private String genre;       // Tür
    private String imageUrl;    // Resim URL
    private String description;
}

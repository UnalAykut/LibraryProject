package com.project.login.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String imageUrl;
	
	@Column(nullable = false)
	private String title; //kitap adi
	
	@Column(nullable = false)
	private String author; //kitap yazari
	
	@Column(nullable = false)
	private String genre; //kitap türü
	
	@Column 
	private String description; // Kitap açıklaması
	
	@Column
    private int stock; // Stok durumu (kullanıcılar tarafından ayırt edilebilir)
	
}

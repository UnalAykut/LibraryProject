package com.project.login.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.login.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	
	List<Book> findByTitle(String title); // Kitap adına göre arama
	List<Book> findByGenre(String genre); // Türüne göre arama
	List<Book> findByAuthor(String author); // Türüne göre arama
}

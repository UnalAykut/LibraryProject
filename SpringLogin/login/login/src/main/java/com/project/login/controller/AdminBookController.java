package com.project.login.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.login.dto.BookAdminDto;
import com.project.login.service.BookService;
import com.project.login.service.LogService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("admin/books")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Book Controller", description = "Admin Kitap işlemleri")
@SecurityRequirement(name = "bearerAuth") 
public class AdminBookController {
	@Autowired
    private BookService bookService;
	@Autowired
	private LogService logService;
	
	
	@GetMapping("/getAll")
	public ResponseEntity<List<BookAdminDto>> getAllBookForAdmin(){
		String adminName = SecurityContextHolder.getContext().getAuthentication().getName();
	    logService.saveLog("GET", "Book", null, adminName); // GET işlemini logla
		return ResponseEntity.ok(bookService.getAllBooksForAdmin());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<BookAdminDto> getBookByIdForAdmin(@PathVariable Long id){
		String adminName = SecurityContextHolder.getContext().getAuthentication().getName();
	    logService.saveLog("GET", "Book", id, adminName); // GET işlemini logla
			BookAdminDto book=bookService.getBookByIdForAdmin(id);
			return ResponseEntity.ok(book);
	}
	
	@PostMapping 
	public ResponseEntity<BookAdminDto> addBook(@RequestBody BookAdminDto bookAdminDto){
		String adminName = SecurityContextHolder.getContext().getAuthentication().getName();
	    BookAdminDto createdBook = bookService.saveBook(bookAdminDto);
	    logService.saveLog("POST", "Book", createdBook.getId(), adminName); // POST işlemini logla
	    return ResponseEntity.ok(createdBook);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<BookAdminDto> updateBook(@PathVariable Long id , @RequestBody BookAdminDto bookAdminDto ){
		String adminName = SecurityContextHolder.getContext().getAuthentication().getName();
	    BookAdminDto updatedBook = bookService.updateBook(id, bookAdminDto);
	    logService.saveLog("PUT", "Book", updatedBook.getId(), adminName); // PUT işlemini logla
	    return ResponseEntity.ok(updatedBook);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<BookAdminDto> deleteBook(@PathVariable Long id,String adminName){
		 bookService.deleteBook(id);
		 logService.saveLog("DELETE", "Book", id, adminName);
	     return ResponseEntity.noContent().build();
	}
	
	
	
}

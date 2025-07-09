package com.akp.area.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akp.area.Repo.BookRepo;
import com.akp.area.model.Book;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/book")
public class BookController {
	@Autowired
	private BookRepo er;

	@PostMapping
	public Book addBook(@RequestBody Book b) {
		return er.save(b);
	}
	@GetMapping("/getAll")
	public List<Book> getAllBooks() {
	    return er.findAll();
	}
	

	
	@DeleteMapping("/delete/{id}")
	public String deleteBook(@PathVariable Integer id) {
		if(er.existsById(id)) {
			er.deleteById(id);
			return "deleted succesfull";
		}
		else {
			return "Book Id is not found";
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateBook(@PathVariable Integer id, @RequestBody Book updatedBook) {
	    return er.findById(id).map(existingBook -> {
	        existingBook.setName(updatedBook.getName());
	        existingBook.setAuthor(updatedBook.getAuthor());
	        existingBook.setDate(updatedBook.getDate());

	        Book savedBook = er.save(existingBook);
	        return ResponseEntity.ok(savedBook);  // ✅ Return the updated Book
	    }).orElse(ResponseEntity.badRequest().build());
	}

		
	
}

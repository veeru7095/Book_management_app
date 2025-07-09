package com.akp.area.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akp.area.model.Book;

@Repository
public interface  BookRepo extends JpaRepository<Book, Integer>{

}

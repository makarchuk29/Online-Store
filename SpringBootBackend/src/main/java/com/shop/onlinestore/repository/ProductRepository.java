package com.shop.onlinestore.repository;

import com.shop.onlinestore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import java.awt.print.Book;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @RestResource(path = "category-id")
    Page<Book> findByCategoryId(@Param("id") Long id, Pageable pageable);
}

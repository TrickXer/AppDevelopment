package com.supermarketapp.supermarket.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.supermarketapp.supermarket.model.Product;
import com.supermarketapp.supermarket.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping(value = "/all")
    public ResponseEntity<Object> getProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getProduct(@PathVariable String id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getById(id));
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> addProducts(@RequestPart("data") Object product,
            @RequestPart("file") MultipartFile file) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(productService.add(product, file));
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateProducts(@RequestBody Product product) {
        return ResponseEntity.ok().body(productService.update(product));
    }

}

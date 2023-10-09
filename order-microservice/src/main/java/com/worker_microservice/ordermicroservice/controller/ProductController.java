package com.worker_microservice.ordermicroservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.worker_microservice.ordermicroservice.model.Product;
import com.worker_microservice.ordermicroservice.service.ProductService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping(value = "/all")
    public ResponseEntity<Object> getProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getProduct(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getById(id));
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Object> addProducts(@RequestBody Product product) {
        String response = "";
        Object body = productService.add(product);

        
        if (body == null) response = "Oops...something went wrong!";
        else if (body.getClass() == String.class) response = (String) body;
        else response = "Product added successfully";
        

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}

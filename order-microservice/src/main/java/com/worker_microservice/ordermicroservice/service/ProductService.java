package com.worker_microservice.ordermicroservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.worker_microservice.ordermicroservice.model.Product;
import com.worker_microservice.ordermicroservice.repository.ProductRepository;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Object add(Product product) {
        Optional<Product> newProduct = productRepository.findByProductName(product.getProductName());

        if (newProduct.isPresent()) return "Product already in database";
        return productRepository.save(product);
    }

    public Iterable<Product> getAll() {
        return productRepository.findAll();
    }

    public Object getById(String productId) {
        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent())
            return "No product found";

        return product.get();
    }
}

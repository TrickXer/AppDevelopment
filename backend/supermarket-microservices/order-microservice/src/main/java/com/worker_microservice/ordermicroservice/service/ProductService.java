package com.worker_microservice.ordermicroservice.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.worker_microservice.ordermicroservice.model.Product;
import com.worker_microservice.ordermicroservice.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageService imageService;

    public Object add(Product product, MultipartFile file) throws IOException {
        Optional<Product> newProduct = productRepository.findByProductName(product.getProductName());

        if (newProduct.isPresent())
            return "Product already in database";

        imageService.uploadImage(file, product.getProductName());
        return productRepository.save(product);
    }

    public Iterable<Product> getAll() {
        return productRepository.findAllByOrderByProductName();
    }

    public Product getById(String productId) {
        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent())
            return null;

        return product.get();
    }

    public Boolean update(Product product) {
        Optional<Product> existProduct = productRepository.findById(product.getProductId());

        if (!existProduct.isPresent())
            return false;

        if (product.getProductName() != null) existProduct.get().setProductName(product.getProductName());
        if (product.getProductPrice() != null) existProduct.get().setProductPrice(product.getProductPrice());
        if (product.getFixedProductStock() != 0) existProduct.get().setFixedProductStock(product.getFixedProductStock());
        
        existProduct.get().setProductStock(product.getProductStock());

        return productRepository.save(existProduct.get()) != null ? true : false;
    }
}

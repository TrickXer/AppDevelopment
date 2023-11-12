package com.supermarketapp.supermarket.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermarketapp.supermarket.service.ImageService;

@RestController
@RequestMapping("/api/v2/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping("{fileName}")
    public ResponseEntity<?> get(@PathVariable String fileName) throws IOException {
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("image/png"))
                .body(imageService.getImage(fileName));
    }
    
}

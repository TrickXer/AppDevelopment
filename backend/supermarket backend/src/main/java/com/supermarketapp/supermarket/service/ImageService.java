package com.supermarketapp.supermarket.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final RestTemplate restTemplate;

    private final String ImageServiceURL = "http://localhost:8081/api/v1/images/";

    public byte[] getImage(String fileName) {
        byte[] response = restTemplate.getForEntity(ImageServiceURL + fileName, byte[].class).getBody();

        return response;
    }
}

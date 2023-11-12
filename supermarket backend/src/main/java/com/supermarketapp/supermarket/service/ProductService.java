package com.supermarketapp.supermarket.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.supermarketapp.supermarket.model.Product;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final String productMicroServiceURL = "http://localhost:8081/api/v1/products";
    private final OrderDetailsService orderDetailsService;
    private final RestTemplate restTemplate;

    public ArrayList<?> getAll() {
        ResponseEntity<ArrayList> response = restTemplate.getForEntity(productMicroServiceURL + "/all", ArrayList.class);
        ArrayList<LinkedHashMap> responseBody = response.getBody();
        
        for (LinkedHashMap product : responseBody) {
            String productId = (String) product.get("productId");
            int count = orderDetailsService.getCountOfProduct(productId);

            product.put("noOfProductSold", count);
        }

        return responseBody;
    }

    public Object add(Object product, MultipartFile file) throws IOException {
        MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();

        // FORMDATA
        HttpHeaders reqHeaders = new HttpHeaders();
        reqHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

        // FILE
        HttpHeaders reqFileHeaders = new HttpHeaders();
        reqFileHeaders.setContentType(MediaType.IMAGE_PNG);

        ByteArrayResource fileAsResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };
        HttpEntity<ByteArrayResource> httpFile = new HttpEntity<ByteArrayResource>(fileAsResource, reqFileHeaders);

        // JSON
        HttpHeaders reqDataHeaders = new HttpHeaders();
        reqDataHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> httpData = new HttpEntity<Object>(product, reqDataHeaders);

        formData.set("file", httpFile);
        formData.set("data", httpData);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<MultiValueMap<String, Object>>(formData, reqHeaders);
        String response = restTemplate.postForEntity(productMicroServiceURL + "/add", request, String.class).getBody();

        return response;
    }

    public LinkedHashMap getById(String productId) throws Exception {
        ResponseEntity<LinkedHashMap> response = restTemplate.getForEntity(productMicroServiceURL + "/" + productId,
                LinkedHashMap.class);
        LinkedHashMap responseBody = response.getBody();

        String id = (String) responseBody.get("productId");
        LinkedHashMap<String, Integer> sales = orderDetailsService.getCountOfProductWithMonths(productId);

        responseBody.put("sales", sales);

        return responseBody;
    }

    public String update(Product product) {
        HttpEntity<Product> request = new HttpEntity<Product>(product);
        String response = restTemplate.exchange(productMicroServiceURL + "/update", HttpMethod.PUT, request, String.class).getBody();

        return response;
    }
}

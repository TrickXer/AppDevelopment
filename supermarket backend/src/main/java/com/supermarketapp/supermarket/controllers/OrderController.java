package com.supermarketapp.supermarket.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermarketapp.supermarket.model.OrderDetails;
import com.supermarketapp.supermarket.service.OrderDetailsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderDetailsService orderDetailsService;
    
    @PostMapping(value = "/add")
    public ResponseEntity<Object> addOrders(@RequestBody OrderDetails orderDetails) {

        Boolean isOrderAdded = orderDetailsService.addOrder(orderDetails);
        String response = isOrderAdded ? "order added successfully" : "Oops...something went wrong";

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Object> getOrders() throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(orderDetailsService.getAll());
    }

    @GetMapping(value = "/{orderId}")
    public ResponseEntity<Object> getOrderById(@PathVariable String orderId) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(orderDetailsService.getById(orderId));
    }

}

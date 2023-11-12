package com.supermarketapp.supermarket.controllers;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermarketapp.supermarket.model.User;
import com.supermarketapp.supermarket.service.OrderDetailsService;
import com.supermarketapp.supermarket.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final OrderDetailsService orderDetailsService;
    
    @GetMapping(value = "/all")
    public ResponseEntity<Object> getUsers() throws Exception {
        List<User> users = userService.getAll();

        LinkedList<Object> usersDetails = new LinkedList<>();

        for (User user : users) {
            Map<String, Object> userDetails = new HashMap<>();

            userDetails.put("user", user);
            userDetails.put("orders", orderDetailsService.getByUser(user));

            usersDetails.add(userDetails);
        }

        return ResponseEntity.status(HttpStatus.OK).body(usersDetails);
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity<Object> getUserById(@PathVariable String userId) throws Exception {
        User user = userService.getById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(orderDetailsService.getByUser(user));
    }

}

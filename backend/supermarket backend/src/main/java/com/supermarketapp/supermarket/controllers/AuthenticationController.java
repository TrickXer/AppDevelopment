package com.supermarketapp.supermarket.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermarketapp.supermarket.dto.request.AuthenticationRequest;
import com.supermarketapp.supermarket.service.WorkerService;
import com.supermarketapp.supermarket.utils.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final WorkerService workerService;
    private final JwtUtil jwtUtil;
    
    @PostMapping("/authenticate")
    public ResponseEntity<Object> authenticate(@RequestBody AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getName(), request.getPassword()));

        final UserDetails worker = workerService.loadUserByUsername(request.getName());
        if (worker != null) {
            // System.out.println("inside controller");

            return ResponseEntity.ok().body(Map.of("token", jwtUtil.generateToken(worker)));
        }

        return ResponseEntity.status(400).body("No data found!");
    }

    @GetMapping("/test")
    public String test() {
        return "Welcome, authentication success";
    }
}

package com.supermarketapp.supermarket.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supermarketapp.supermarket.model.Admin;
import com.supermarketapp.supermarket.repository.WorkerRepository;

@Service
public class AdminService {
    @Autowired
    private WorkerRepository workerRepository;

    public Object authAdmin(String adminName, String password) {
        String role = "ADMIN";
        Optional<Admin> admin = workerRepository.findByWorkerNameAndWorkerPasswordAndRole(adminName, password, role);

        if (!admin.isPresent())
            return null;
        
        return null;
    }
}

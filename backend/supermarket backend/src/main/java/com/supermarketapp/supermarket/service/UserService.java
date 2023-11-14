package com.supermarketapp.supermarket.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supermarketapp.supermarket.model.User;
import com.supermarketapp.supermarket.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getById(String userId) {
        Optional<User> user = userRepository.findById(userId);

        if (!user.isPresent())
            return null;
            
        return user.get();
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User getExistingUser(String userName, Long userContact) {
        Optional<User> user = userRepository.findByUserNameAndUserContact(userName, userContact);

        if (!user.isPresent())
            return null;

        return user.get();
    }
    
}

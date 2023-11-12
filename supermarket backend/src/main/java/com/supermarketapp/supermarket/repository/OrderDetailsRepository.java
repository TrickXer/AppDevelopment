package com.supermarketapp.supermarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supermarketapp.supermarket.model.OrderDetails;
import com.supermarketapp.supermarket.model.User;
import com.supermarketapp.supermarket.model.OrderInterface;

import java.util.List;
import java.util.Optional;


public interface OrderDetailsRepository extends JpaRepository<OrderDetails, String> {

    public List<OrderDetails> findAllByOrderByOrderDateDesc();
    
    public Optional<OrderDetails> findByOrderId(String orderId);

    public List<OrderInterface> findByUser(User user);

}

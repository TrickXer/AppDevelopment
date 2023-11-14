package com.supermarketapp.supermarket.model;

import java.util.List;

public interface OrderInterface {
    String getOrderId();
    String getOrderDate();
    List<Item> getItems();
}

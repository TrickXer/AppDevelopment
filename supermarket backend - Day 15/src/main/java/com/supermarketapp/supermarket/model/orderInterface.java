package com.supermarketapp.supermarket.model;

import java.util.List;

public interface orderInterface {
    String getOrderId();
    String getOrderDate();
    List<Item> getItems();
}

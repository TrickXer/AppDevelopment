package com.supermarketapp.supermarket.service;

import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supermarketapp.supermarket.model.Item;
import com.supermarketapp.supermarket.model.OrderDetails;
import com.supermarketapp.supermarket.model.User;
import com.supermarketapp.supermarket.model.OrderInterface;
import com.supermarketapp.supermarket.model.Product;
import com.supermarketapp.supermarket.repository.OrderDetailsRepository;


@Service
public class OrderDetailsService {
    @Autowired
    private ProductService productService;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private UserService userService;

    public Iterable<Object> getAll() throws Exception {
        List<OrderDetails> oldOrders = orderDetailsRepository.findAllByOrderByOrderDateDesc();
        LinkedList<Object> newOrders = new LinkedList<>();

        for (OrderDetails order : oldOrders) {
            List<Item> items = order.getItems();
            LinkedList<Object> newItems = new LinkedList<>();

            for (Item item : items) {
                Map<String, Object> product = new HashMap<>();
                LinkedHashMap fetchProduct = productService.getById(item.getProductId());

                product.put("productId", fetchProduct.get("productId"));
                product.put("productName", fetchProduct.get("productName"));
                product.put("productPrice", fetchProduct.get("productPrice"));
                product.put("productStock", fetchProduct.get("productStock"));
                product.put("productQuantity", item.getProductQuantity());

                newItems.add(product);
            }
            
            Map<String, Object> newOrder = new HashMap<>();

            newOrder.put("orderId", order.getOrderId());
            newOrder.put("orderDate", order.getOrderDate());
            newOrder.put("items", newItems);
            newOrder.put("user", order.getUser());

            newOrders.add(newOrder);
        }

        return newOrders;
    }

    public Object getById(String orderId) throws Exception {
        Optional<OrderDetails> order = orderDetailsRepository.findById(orderId);

        if (!order.isPresent())
            return null;

        List<Item> items = order.get().getItems();
        LinkedList<Object> newItems = new LinkedList<>();

        for (Item item : items) {
            Map<String, Object> product = new HashMap<>();
            LinkedHashMap fetchProduct = productService.getById(item.getProductId());

            product.put("productId", fetchProduct.get("productId"));
            product.put("productName", fetchProduct.get("productName"));
            product.put("productPrice", fetchProduct.get("productPrice"));
            product.put("productStock", fetchProduct.get("productStock"));
            product.put("productQuantity", item.getProductQuantity());

            newItems.add(product);
        }
        
        Map<String, Object> newOrder = new HashMap<>();

        newOrder.put("orderId", order.get().getOrderId());
        newOrder.put("orderDate", order.get().getOrderDate());
        newOrder.put("items", newItems);
        newOrder.put("user", order.get().getUser());
        
        return newOrder;
    }

    public Boolean addOrder(OrderDetails orderDetails) {
        User userDetails = orderDetails.getUser();
        User user = userService.getExistingUser(userDetails.getUserName(), userDetails.getUserContact());

        if (user != null)
            orderDetails.setUser(user);

        return orderDetailsRepository.save(orderDetails) != null ? true : false;
    }

    public LinkedList<Object> getByUser(User user) throws Exception {
        List<OrderInterface> oldOrders = orderDetailsRepository.findByUser(user);
        LinkedList<Object> newOrders = new LinkedList<>();

        for (OrderInterface order : oldOrders) {
            List<Item> items = order.getItems();
            LinkedList<Object> newItems = new LinkedList<>();

            for (Item item : items) {
                Map<String, Object> product = new HashMap<>();
                LinkedHashMap fetchProduct = productService.getById(item.getProductId());

                product.put("productId", fetchProduct.get("productId"));
                product.put("productName", fetchProduct.get("productName"));
                product.put("productPrice", fetchProduct.get("productPrice"));
                product.put("productStock", fetchProduct.get("productStock"));
                product.put("productQuantity", item.getProductQuantity());

                newItems.add(product);
            }
            
            Map<String, Object> newOrder = new HashMap<>();

            newOrder.put("orderId", order.getOrderId());
            newOrder.put("orderDate", order.getOrderDate());
            newOrder.put("items", newItems);
            // newOrder.put("user", user);

            newOrders.add(newOrder);
        }

        return newOrders;
    }

    public int getCountOfProduct(String productId) {
        List<OrderDetails> orders = orderDetailsRepository.findAll();

        int count = 0;

        for (OrderDetails order : orders) {
            List<Item> items = order.getItems();

            for (Item item : items) {
                if (item.getProductId().equals(productId)) {
                    count += item.getProductQuantity();
                }
            }
        }

        return count;
    }

    public LinkedHashMap<String, Integer> getCountOfProductWithMonths(String productId) throws Exception {
        List<OrderDetails> orders = orderDetailsRepository.findAll();

        LinkedHashMap<String, Integer> sales = new LinkedHashMap<>();

        for (OrderDetails order : orders) {
            List<Item> items = order.getItems();

            Date formatDate = new Date(Long.parseLong(order.getOrderDate()));

            SimpleDateFormat monthFormat = new SimpleDateFormat("MMM", Locale.ENGLISH);
            String month = monthFormat.format(formatDate);

            for (Item item : items) {
                if (item.getProductId().equals(productId)) {
                    int count = 0;
                    if (sales.containsKey(month))
                        count = sales.get(month);

                    sales.put(month, count + item.getProductQuantity());
                }
            }
        }

        return sales;
    }

}

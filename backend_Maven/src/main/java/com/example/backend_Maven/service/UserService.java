package com.example.backend_Maven.service;

import com.example.backend_Maven.model.User;

public interface UserService {
    public User registerUser(User user);
    public User getUser(String username, String password);
}

package com.example.backend_Maven.service;

import com.example.backend_Maven.model.User;
import com.example.backend_Maven.repositoty.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {
        if (userRepository.findByUsernameOrEmail(user.getUsername(), user.getEmail()) != null) {
            return null;
        } else {
            User newUser = userRepository.save(user);
            if (newUser != null) {
                newUser.setPassword("");
            }
            return newUser;
        }
    }

    @Override
    public User getUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
}

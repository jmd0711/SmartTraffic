package com.example.backend_Maven.controller;

import com.example.backend_Maven.model.User;
import com.example.backend_Maven.service.UserService;
import com.example.backend_Maven.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public Result<User> add(@RequestBody User newUser) {
        User user = userService.registerUser(newUser);
        if (user != null) {
            return Result.success(user, "User Signed up successfully!");
        } else {
            return Result.error("400", "User already exists.");
        }
    }
}

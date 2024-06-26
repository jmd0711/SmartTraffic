package com.example.backend_Maven.repositoty;

import com.example.backend_Maven.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsernameAndPassword(String username, String password);
    User findByUsernameOrEmail(String username, String email);
}

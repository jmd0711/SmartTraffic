package com.example.backend_Maven.repositoty;

import com.example.backend_Maven.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
}

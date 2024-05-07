package com.example.backend_Maven.repositoty;

import com.example.backend_Maven.model.Cctv;
import com.example.backend_Maven.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByLocationNameContainingOrId(String location_name, Integer id);
}

package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Cctv;
import com.example.backend_Maven.model.Event;

import java.util.List;

public interface EventService {
    public List<Event> getAllEvents();
    public List<Event> findByLocationNameContainingOrId(String locationName, Integer id);
}

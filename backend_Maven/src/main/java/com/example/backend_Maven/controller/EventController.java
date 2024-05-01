package com.example.backend_Maven.controller;

import com.example.backend_Maven.model.Event;
import com.example.backend_Maven.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/event")
@CrossOrigin
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("getAll")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }
}

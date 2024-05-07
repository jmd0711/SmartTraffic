package com.example.backend_Maven.controller;

import com.example.backend_Maven.model.Cctv;
import com.example.backend_Maven.model.Event;
import com.example.backend_Maven.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/search")
    public ResponseEntity<List<Event>> findByLocationNameContainingOrId(@RequestParam(required = false) String locationName, @RequestParam(required = false) Integer id) {
        List<Event> events = eventService.findByLocationNameContainingOrId(locationName, id);
        if (events.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
}

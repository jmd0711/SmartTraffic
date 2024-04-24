package com.example.backend_Maven.controller;

import com.example.backend_Maven.model.Drone;
import com.example.backend_Maven.service.DroneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/drone")
@CrossOrigin
public class DroneController {
    @Autowired
    private DroneService droneService;

    @PostMapping("/add")
    public String add(@RequestBody Drone drone){
        droneService.saveDrone(drone);
        return "New Drone camera is added";
    }

    @GetMapping("/getAll")
    public List<Drone> list(){
        return droneService.getAllDrone();
    }

    @GetMapping("/{id}")
    public Optional<Drone> findByID(Integer id){
        return droneService.findById(id);
    }
}
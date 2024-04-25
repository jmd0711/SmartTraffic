package com.example.backend_Maven.controller;

import com.example.backend_Maven.model.Drone;
import com.example.backend_Maven.service.DroneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/search")
    public ResponseEntity<List<Drone>> findByLocationNameContainingOrId(@RequestParam(required = false) String locationName, @RequestParam(required = false) Integer id) {
        List<Drone> drones = droneService.findByLocationNameContainingOrId(locationName, id);
        if (drones.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(drones, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDroneEntry(@PathVariable Integer id) {
        try {
            droneService.deleteDroneEntry(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
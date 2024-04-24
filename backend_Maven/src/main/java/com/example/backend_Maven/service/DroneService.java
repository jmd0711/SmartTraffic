package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Drone;

import java.util.List;
import java.util.Optional;

public interface DroneService {
    public Drone saveDrone(Drone drone);
    public List<Drone> getAllDrone();
    public Optional<Drone> findById(Integer id);
    void delete(Integer id);
}
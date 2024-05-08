package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Drone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public interface DroneService {
    public Drone saveDrone(Drone drone);
    public List<Drone> getAllDrone();
    public Optional<Drone> findById(Integer id);
    void delete(Integer id);
    public List<Drone> findByLocationNameContainingOrId(String locationName, Integer id);
    @Transactional
    public void deleteDroneEntry(Integer id);
}
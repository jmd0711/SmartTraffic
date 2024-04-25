package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Drone;
import com.example.backend_Maven.repositoty.DroneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DroneServiceImpl implements DroneService {

    @Autowired
    private DroneRepository droneRepository;

    @Override
    public Drone saveDrone(Drone drone) {
        return droneRepository.save(drone);
    }

    @Override
    public List<Drone> getAllDrone() {
        return droneRepository.findAll();
    }

    @Override
    public Optional<Drone> findById(Integer id) {
        return droneRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        droneRepository.deleteById(id);
    }

    @Override
    public List<Drone> findByLocationNameContainingOrId(String locationName, Integer id) {
        return droneRepository.findByLocationNameContainingOrId(locationName, id);
    }

    @Override
    @Transactional
    public void deleteDroneEntry(Integer id) {
        droneRepository.deleteById(id);
    }

}
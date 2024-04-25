package com.example.backend_Maven.repositoty;

import com.example.backend_Maven.model.Drone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DroneRepository extends JpaRepository<Drone,Integer> {
    List<Drone> findByLocationNameContainingOrId(String location_name, Integer id);
}
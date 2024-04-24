package com.example.backend_Maven.repositoty;

import com.example.backend_Maven.model.Cctv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CctvRepository extends JpaRepository<Cctv,Integer> {
    List<Cctv> findByLocationNameContainingOrId(String location_name, Integer id);
}
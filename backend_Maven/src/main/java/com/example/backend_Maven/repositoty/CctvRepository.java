package com.example.backend_Maven.repositoty;

import com.example.backend_Maven.model.Cctv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CctvRepository extends JpaRepository<Cctv,Integer> {
}
package com.example.backend_Maven.repositoty;

import com.example.backend_Maven.model.Iot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IotRepository extends JpaRepository<Iot, Long> {
    List<Iot> findByCounty(String county);
}
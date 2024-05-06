package com.example.backend_Maven.repositoty;

import com.example.backend_Maven.model.Iot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface IotRepository extends JpaRepository<Iot, Integer> {
    @Query("SELECT i FROM Iot i WHERE " +
            "(:eventType IS NULL OR i.eventType = :eventType) AND " +
            "(:dataSourceId IS NULL OR i.dataSourceId = :dataSourceId) AND " +
            "(:roadNames IS NULL OR i.roadNames LIKE %:roadNames%) AND " +
            "(:eventStatus IS NULL OR i.eventStatus = :eventStatus)")
    List<Iot> findByCriteria(@Param("eventType") String eventType,
                             @Param("dataSourceId") String dataSourceId,
                             @Param("roadNames") String roadNames,
                             @Param("eventStatus") String eventStatus);
}









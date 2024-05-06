package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Iot;
import java.util.List;
import java.util.Optional;

public interface IotService {
    Iot save(Iot iot);
    List<Iot> findAll();
    Optional<Iot> findById(Integer id);
    void delete(Integer id);
    List<Iot> searchIots(String eventType, String dataSourceId, String roadNames, String eventStatus);
}

package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Iot;
import java.util.List;
import java.util.Optional;

public interface IotService {
    Iot saveIot(Iot iot);
    Optional<Iot> findById(Long id);
    List<Iot> getAllIot();  // Fetch all Iot entries
    List<Iot> getAllIotLimited();  // Fetch a limited number of Iot entries
    List<Iot> findByCounty(String county);
    void delete(Long id);
    void deleteIotEntry(Long id);
    boolean updateIotEntry(Long id, Iot updatedIot);  // New method for updating an Iot entry
}

package com.example.backend_Maven.service;
import com.example.backend_Maven.model.Iot;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@Service
public interface IotService {
    public Iot saveIot(Iot iot);
    public List<Iot> getAllIot();

    public Optional<Iot> findById(Long id);
    void delete(Long id);
    public List<Iot> findByCounty(String county);

    @Transactional
    public void deleteIotEntry(Long id);
}

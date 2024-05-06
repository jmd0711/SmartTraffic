package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Iot;
import com.example.backend_Maven.repositoty.IotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;



@Service
public class IotServiceImpl implements IotService {

    @Autowired
    private IotRepository iotRepository;

    @Override
    public Iot save(Iot iot) {
        return iotRepository.save(iot);
    }

    @Override
    public List<Iot> findAll() {
        return iotRepository.findAll();
    }

    @Override
    public Optional<Iot> findById(Integer id) {
        return iotRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        iotRepository.deleteById(id);
    }

    @Override
    public List<Iot> searchIots(String eventType, String dataSourceId, String roadNames, String eventStatus) {
        return iotRepository.findByCriteria(eventType, dataSourceId, roadNames, eventStatus);
    }
}




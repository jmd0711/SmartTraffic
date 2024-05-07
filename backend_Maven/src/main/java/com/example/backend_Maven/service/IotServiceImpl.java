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
    public Iot saveIot(Iot iot) {
        return iotRepository.save(iot);
    }

    @Override
    public List<Iot> getAllIot() {
        return iotRepository.findAll();
    }

    @Override
    public Optional<Iot> findById(Long id) {
        return iotRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        iotRepository.deleteById(id);
    }

    @Override
    public List<Iot> findByCounty(String county) {
        return iotRepository.findByCounty(county);
    }

    @Override
    @Transactional
    public void deleteIotEntry(Long id) {
        iotRepository.deleteById(id);
    }
}




package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Iot;
import com.example.backend_Maven.repositoty.IotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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
    public Optional<Iot> findById(Long id) {
        return iotRepository.findById(id);
    }

    @Override
    public List<Iot> getAllIot() {
        return iotRepository.findAll();
    }

    @Override
    public List<Iot> getAllIotLimited() {
        // Fetch only the first 100 entries as an example
        return iotRepository.findAll(PageRequest.of(0, 2000)).getContent();
    }

    @Override
    public List<Iot> findByCounty(String county) {
        return iotRepository.findByCounty(county);
    }

    @Override
    public void delete(Long id) {
        iotRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteIotEntry(Long id) {
        iotRepository.deleteById(id);
    }

    @Override
    @Transactional
    public boolean updateIotEntry(Long id, Iot updatedIot) {
        if (iotRepository.existsById(id)) {
            updatedIot.setId(id);  // Ensure the ID is not changed
            iotRepository.save(updatedIot);
            return true;
        }
        return false;
    }
}

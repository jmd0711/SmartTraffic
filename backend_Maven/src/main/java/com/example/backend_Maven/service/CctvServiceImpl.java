package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Cctv;
import com.example.backend_Maven.repositoty.CctvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CctvServiceImpl implements CctvService {

    @Autowired
    private CctvRepository cctvRepository;

    @Override
    public Cctv saveCctv(Cctv cctv) {
        return cctvRepository.save(cctv);
    }

    @Override
    public List<Cctv> getAllCctv() {
        return cctvRepository.findAll();
    }

    @Override
    public Optional<Cctv> findById(Integer id) {
        return cctvRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        cctvRepository.deleteById(id);
    }

    @Override
    public List<Cctv> findByLocationNameOrId(String locationName, Integer id) {
        return cctvRepository.findByLocationNameOrId(locationName, id);
    }

}
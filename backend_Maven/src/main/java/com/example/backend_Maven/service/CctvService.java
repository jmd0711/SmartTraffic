package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Cctv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public interface CctvService {
    public Cctv saveCctv(Cctv cctv);
    public List<Cctv> getAllCctv();
    public Optional<Cctv> findById(Integer id);
    void delete(Integer id);
    public List<Cctv> findByLocationNameContainingOrId(String locationName, Integer id);
    @Transactional
    public void deleteCCTVEntry(Integer id);
}
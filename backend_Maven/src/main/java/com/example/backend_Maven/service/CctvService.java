package com.example.backend_Maven.service;

import com.example.backend_Maven.model.Cctv;

import java.util.List;
import java.util.Optional;

public interface CctvService {
    public Cctv saveCctv(Cctv cctv);
    public List<Cctv> getAllCctv();
    public Optional<Cctv> findById(Integer id);
    void delete(Integer id);
}
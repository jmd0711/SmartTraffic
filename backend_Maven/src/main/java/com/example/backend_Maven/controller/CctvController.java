package com.example.backend_Maven.controller;

import com.example.backend_Maven.model.Cctv;
import com.example.backend_Maven.service.CctvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cctv")
@CrossOrigin
public class CctvController {
    @Autowired
    private CctvService cctvService;

    @PostMapping("/add")
    public String add(@RequestBody Cctv cctv){
        cctvService.saveCctv(cctv);
        return "New CCTV camera is added";
    }

    @GetMapping("/getAll")
    public List<Cctv> list(){
        return cctvService.getAllCctv();
    }

    @GetMapping("/{id}")
    public Optional<Cctv> findByID(Integer id){
        return cctvService.findById(id);
    }
}
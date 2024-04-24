package com.example.backend_Maven.controller;

import com.example.backend_Maven.model.Cctv;
import com.example.backend_Maven.service.CctvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/search")
    public ResponseEntity<List<Cctv>> findByLocationNameContainingOrId(@RequestParam(required = false) String locationName, @RequestParam(required = false) Integer id) {
        List<Cctv> cctvs = cctvService.findByLocationNameContainingOrId(locationName, id);
        if (cctvs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cctvs, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCCTVEntry(@PathVariable Integer id) {
        try {
            cctvService.deleteCCTVEntry(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
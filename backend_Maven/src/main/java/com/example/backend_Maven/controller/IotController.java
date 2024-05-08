package com.example.backend_Maven.controller;
import com.example.backend_Maven.model.Iot;
import com.example.backend_Maven.service.IotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/iot")
@CrossOrigin
public class IotController {

    @Autowired
    private IotService iotService;

    @PostMapping("/add")
    public String add(@RequestBody Iot iot) {
        iotService.saveIot(iot);
        return "New IoT entry added";
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Iot>> list() {
        List<Iot> iots = iotService.getAllIotLimited();
        if (!iots.isEmpty()) {
            return new ResponseEntity<>(iots, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Iot>> findById(@PathVariable Long id) {
        Optional<Iot> iot = iotService.findById(id);
        if (iot.isPresent()) {
            return new ResponseEntity<>(iot, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Iot>> findByCounty(@RequestParam(required = false) String county) {
        List<Iot> iots = iotService.findByCounty(county);
        if (iots.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(iots, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Iot iot) {
        if (iotService.updateIotEntry(id, iot)) {
            return ResponseEntity.ok("IoT entry updated successfully");
        }
        return ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIotEntry(@PathVariable Long id) {
        try {
            iotService.deleteIotEntry(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

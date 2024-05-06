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


        @GetMapping("/all")
        public ResponseEntity<List<Iot>> getAllIots() {
            List<Iot> iots = iotService.findAll();
            if (iots.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(iots);
        }


    @PostMapping("/add")
    public ResponseEntity<String> addIot(@RequestBody Iot iot) {
        iotService.save(iot);
        return ResponseEntity.ok("New IoT data added");
    }



    @GetMapping("/{id}")
    public ResponseEntity<Iot> getIotById(@PathVariable Integer id) {
        Optional<Iot> iot = iotService.findById(id);
        return iot.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateIot(@PathVariable Integer id, @RequestBody Iot iotDetails) {
        Optional<Iot> iotData = iotService.findById(id);
        if (iotData.isPresent()) {
            Iot updatedIot = iotData.get();
            updatedIot.setEventType(iotDetails.getEventType());
            updatedIot.setDataSourceId(iotDetails.getDataSourceId());
            updatedIot.setRoadNames(iotDetails.getRoadNames());
            updatedIot.setEventStatus(iotDetails.getEventStatus());
            updatedIot.setVehicleImpact(iotDetails.getVehicleImpact());
            updatedIot.setLocationMethod(iotDetails.getLocationMethod());
            iotService.save(updatedIot);
            return ResponseEntity.ok("IoT data updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("IoT Data Not Found");
        }
    }
    @GetMapping("/search")
    public ResponseEntity<List<Iot>> searchIots(@RequestParam(required = false) String eventType,
                                                @RequestParam(required = false) String dataSourceId,
                                                @RequestParam(required = false) String roadNames,
                                                @RequestParam(required = false) String eventStatus) {
        List<Iot> iots = iotService.searchIots(eventType, dataSourceId, roadNames, eventStatus);
        if (iots.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(iots, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteIot(@PathVariable Integer id) {
        try {
            iotService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

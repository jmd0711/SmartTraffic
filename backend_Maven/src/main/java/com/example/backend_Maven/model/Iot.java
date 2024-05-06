package com.example.backend_Maven.model;
import jakarta.persistence.*;


@Entity

public class Iot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String eventType;

    private String dataSourceId;

    private String roadNames;

    private String eventStatus;

    private String vehicleImpact;

    private String locationMethod;

    public Iot() {
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getDataSourceId() {
        return dataSourceId;
    }

    public void setDataSourceId(String dataSourceId) {
        this.dataSourceId = dataSourceId;
    }

    public String getRoadNames() {
        return roadNames;
    }

    public void setRoadNames(String roadNames) {
        this.roadNames = roadNames;
    }

    public String getEventStatus() {
        return eventStatus;
    }

    public void setEventStatus(String eventStatus) {
        this.eventStatus = eventStatus;
    }

    public String getVehicleImpact() {
        return vehicleImpact;
    }

    public void setVehicleImpact(String vehicleImpact) {
        this.vehicleImpact = vehicleImpact;
    }

    public String getLocationMethod() {
        return locationMethod;
    }

    public void setLocationMethod(String locationMethod) {
        this.locationMethod = locationMethod;
    }
}

package com.example.backend_Maven.model;
import jakarta.persistence.*;

@Entity
public class Iot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String district;
    @Column(name = "county")
    private String county;
    private String longitude;
    private String latitude;
    private String elevation;
    private String postmile;
    private String inService;

    public Iot() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getElevation() {
        return elevation;
    }

    public void setElevation(String elevation) {
        this.elevation = elevation;
    }

    public String getPostmile() {
        return postmile;
    }

    public void setPostmile(String postmile) {
        this.postmile = postmile;
    }


    public String getInService() {
        return inService;
    }

    public void setInService(String inService) {
        this.inService = inService;
    }
}

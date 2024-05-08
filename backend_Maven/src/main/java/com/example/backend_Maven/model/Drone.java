package com.example.backend_Maven.model;

import jakarta.persistence.*;


//CREATE TABLE drone (
//id INT AUTO_INCREMENT PRIMARY KEY,
//locationName VARCHAR(255),
//nearby_place VARCHAR(255),
//longitude VARCHAR(100),
//latitude VARCHAR(100),
//inService VARCHAR(35),
//streamingVideoURL VARCHAR(3000),
//currentImageURL VARCHAR(3000)
//);

@Entity
public class Drone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "location_name")
    private String locationName;
    @Column(name = "nearby_place")
    private String nearbyPlace;
    private String longitude;
    private String latitude;
    private String inService;
    private String videoUrl; //camera_link
    private String imageUrl;

    public Drone() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getNearbyPlace() {
        return nearbyPlace;
    }

    public void setNearbyPlace(String nearbyPlace) {
        this.nearbyPlace = nearbyPlace;
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

    public String getInService() {
        return inService;
    }

    public void setInService(String inService) {
        this.inService = inService;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
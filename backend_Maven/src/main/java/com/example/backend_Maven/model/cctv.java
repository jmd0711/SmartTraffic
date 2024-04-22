package com.example.backend_Maven.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;
//CREATE TABLE cctv (
//id INT AUTO_INCREMENT PRIMARY KEY,
//nearby_place VARCHAR(255),
//camera_name VARCHAR(255),
//camera_link VARCHAR(3000),
//route VARCHAR(255),
//county VARCHAR(255)
//);
public class cctv {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String route;

    private String county;

    private String nearby; //nearby_place

    private String stream; //camera_link

    private String url; //camera_link

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String name) {
        this.route = route;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getNearby() {
        return nearby;
    }

    public void setNearby(String nearby) {
        this.nearby = nearby;
    }

    public String getStream() {
        return stream;
    }

    public void setStream(String stream) {
        this.stream = stream;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
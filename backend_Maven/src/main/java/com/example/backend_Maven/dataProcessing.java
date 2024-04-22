package com.example.backend_Maven;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class dataProcessing {

    public static void main(String[] args) {
        JSONParser parser = new JSONParser();

        String[] links = {"https://cwwp2.dot.ca.gov/data/d1/cctv/cctvStatusD01.json",
                "https://cwwp2.dot.ca.gov/data/d2/cctv/cctvStatusD02.json",
                "https://cwwp2.dot.ca.gov/data/d3/cctv/cctvStatusD03.json",
                "https://cwwp2.dot.ca.gov/data/d4/cctv/cctvStatusD04.json",
                "https://cwwp2.dot.ca.gov/data/d5/cctv/cctvStatusD05.json",
                "https://cwwp2.dot.ca.gov/data/d6/cctv/cctvStatusD06.json",
                "https://cwwp2.dot.ca.gov/data/d7/cctv/cctvStatusD07.json",
                "https://cwwp2.dot.ca.gov/data/d8/cctv/cctvStatusD08.json",
                "https://cwwp2.dot.ca.gov/data/d9/cctv/cctvStatusD09.json",
                "https://cwwp2.dot.ca.gov/data/d10/cctv/cctvStatusD10.json",
                "https://cwwp2.dot.ca.gov/data/d11/cctv/cctvStatusD11.json",
                "https://cwwp2.dot.ca.gov/data/d12/cctv/cctvStatusD12.json"};

        for (String i : links) {
            try {
                // Fetch JSON data from URL
                URL url = new URL(i);
                URLConnection conn = url.openConnection();
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder jsonBuilder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    jsonBuilder.append(line);
                }
                reader.close();

                // Parse JSON data
                Object obj = parser.parse(jsonBuilder.toString());
                JSONObject jsonObject = (JSONObject) obj;
                JSONArray data = (JSONArray) jsonObject.get("data");

                // Establish MySQL connection
                Connection dbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/smart-traffic", "root", "");

                // Insert data into MySQL
                for (Object o : data) {
                    JSONObject item = (JSONObject) o;
                    JSONObject cctv = (JSONObject) item.get("cctv");

                    String locationName = ((JSONObject) cctv.get("location")).get("locationName").toString();
                    String nearbyPlace = ((JSONObject) cctv.get("location")).get("nearbyPlace").toString();
                    String longitude = ((JSONObject) cctv.get("location")).get("longitude").toString();
                    String latitude = ((JSONObject) cctv.get("location")).get("latitude").toString();
                    String inService = (String) cctv.get("inService");
                    String streamingVideoURL = ((JSONObject) cctv.get("imageData")).get("streamingVideoURL").toString();
                    String currentImageURL = ((JSONObject)((JSONObject) cctv.get("imageData")).get("static")).get("currentImageURL").toString();

                    // Insert into MySQL table
                    String sql = "INSERT INTO cctv (locationName, nearby_place, longitude, latitude, inService, streamingVideoURL, currentImageURL) VALUES (?, ?, ?, ?, ?, ?, ?)";
                    PreparedStatement pstmt = dbConnection.prepareStatement(sql);
                    pstmt.setString(1, locationName);
                    pstmt.setString(2, nearbyPlace);
                    pstmt.setString(3, longitude);
                    pstmt.setString(4, latitude);
                    pstmt.setString(5, inService);
                    pstmt.setString(6, streamingVideoURL);
                    pstmt.setString(7, currentImageURL);


                    pstmt.executeUpdate();
                }

                dbConnection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }
}

//CREATE TABLE cctv (
//id INT AUTO_INCREMENT PRIMARY KEY,
//locationName VARCHAR(255),
//nearby_place VARCHAR(255),
//longitude VARCHAR(100),
//latitude VARCHAR(100),
//inService VARCHAR(35),
//streamingVideoURL VARCHAR(3000),
//currentImageURL VARCHAR(3000)
//);
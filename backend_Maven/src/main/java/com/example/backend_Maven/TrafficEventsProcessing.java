package com.example.backend_Maven;

import com.example.backend_Maven.utils.APIProps;
import com.example.backend_Maven.utils.APIProps.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.SQLException;

public class TrafficEventsProcessing {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/smart-traffic";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "";

    public static void main(String[] args) {
        try {
            // Make HTTP GET request to the API
            CloseableHttpClient httpClient = HttpClients.createDefault();
            HttpGet httpGet = new HttpGet(APIProps.API_URL);
            CloseableHttpResponse response = httpClient.execute(httpGet);

            // Parse JSON response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getEntity().getContent());

            // Establish MySQL connection
            Connection dbConnection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);

            // Extract specific data from JSON
            JsonNode eventsArray = rootNode.get("events");
            for (JsonNode event : eventsArray) {
                String headline = event.get("headline").asText();
                String eventType = event.get("event_type").asText();
                JsonNode typesArray = event.get("event_subtypes");
                String subType = typesArray.get(0).asText();
                String severity = event.get("severity").asText();
                JsonNode coordinatesArray = event.get("geography").get("coordinates");
                String longitude = coordinatesArray.get(0).asText();
                String latitude = coordinatesArray.get(1).asText();

                // Insert into MySQL table
                String sql = "INSERT INTO event (headline, event_type, sub_type, severity, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?)";
                PreparedStatement pstmt = dbConnection.prepareStatement(sql);
                pstmt.setString(1, headline);
                pstmt.setString(2, eventType);
                pstmt.setString(3, subType);
                pstmt.setString(4, severity);
                pstmt.setString(5, longitude);
                pstmt.setString(6, latitude);

                pstmt.executeUpdate();
            }
            dbConnection.close();
        } catch (IOException | SQLException e) {
            e.printStackTrace();
        }
    }

    private static void clearTable() throws SQLException {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "TRUNCATE TABLE event";
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(sql);
            }
        }
    }
}

//CREATE TABLE events (
//id INT AUTO_INCREMENT PRIMARY KEY,
//headline VARCHAR(255),
//event_type VARCHAR(255),
//sub_type VARCHAR(255),
//severity VARCHAR(255),
//longitude VARCHAR(100),
//latitude VARCHAR(100)
//);
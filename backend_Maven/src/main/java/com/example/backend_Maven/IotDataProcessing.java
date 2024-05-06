package com.example.backend_Maven;


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

public class IotDataProcessing {
    private static final String API_KEY = "AIzaSyCC0nehjtBB_RPR3LkOOqpniJHZUK9JLqE";
    private static final String API_AREA_CODE = "5393021";
    private static final String API_URL = String.format("http://api.511.org/traffic/events?api_key=a54k", API_KEY, API_AREA_CODE);
    private static final String DB_URL = "jdbc:mysql://localhost:3306/smart-traffic";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "";

    public static void main(String[] args) {
        try {
            // Clear the IoT events table before inserting new data
            clearIoTEventsTable();

            // Process and insert IoT events data
            processAndInsertIoTEvents();
        } catch (IOException | SQLException e) {
            e.printStackTrace();
        }
    }

    private static void processAndInsertIoTEvents() throws IOException, SQLException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(API_URL);
        try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getEntity().getContent());
            JsonNode eventsArray = rootNode.get("iot");

            try (Connection dbConnection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
                for (JsonNode event : eventsArray) {
                    String eventType = event.get("event_type").asText();
                    String dataSourceId = event.get("data_source_id").asText();
                    String roadNames = event.get("road_names").asText();
                    String eventStatus = event.get("event_status").asText();
                    String vehicleImpact = event.path("vehicle_impact").asText(null);
                    String locationMethod = event.path("location_method").asText(null);

                    String sql = "INSERT INTO iot (event_type, data_source_id, road_names, event_status, vehicle_impact, location_method) VALUES (?, ?, ?, ?, ?, ?)";
                    try (PreparedStatement pstmt = dbConnection.prepareStatement(sql)) {
                        pstmt.setString(1, eventType);
                        pstmt.setString(2, dataSourceId);
                        pstmt.setString(3, roadNames);
                        pstmt.setString(4, eventStatus);
                        pstmt.setString(5, vehicleImpact);
                        pstmt.setString(6, locationMethod);
                        pstmt.executeUpdate();
                    }
                }
            }
        }
    }

    private static void clearIoTEventsTable() throws SQLException {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
             Statement stmt = conn.createStatement()) {
            String sql = "TRUNCATE TABLE iot";
            stmt.executeUpdate(sql);
        }
    }
}

// SQL Table Creation for IoT Events
// CREATE TABLE iot_events (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   event_type VARCHAR(255),
//   data_source_id VARCHAR(255),
//   road_names VARCHAR(255),
//   event_status VARCHAR(255),
//   vehicle_impact VARCHAR(255),
//   location_method VARCHAR(255)
// );

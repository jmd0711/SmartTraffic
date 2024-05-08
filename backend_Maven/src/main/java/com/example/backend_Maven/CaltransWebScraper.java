package com.example.backend_Maven;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CaltransWebScraper {
    public static void main(String[] args) {
        Connection conn = null;
        try {
            // Connect to the URL
            String url = "https://cwwp2.dot.ca.gov/vm/streamlist.htm";
            Document doc = Jsoup.connect(url).get();

            // Extract data from the table
            Element table = doc.select("table").get(0); // Assuming the data is in the first table
            Elements rows = table.select("tr");

            // Connect to MySQL database
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/smart_traffic", "root", "pass");

            // Process each row of the table (skipping the header row)
            for (int i = 1; i < rows.size(); i++) {
                Element row = rows.get(i);
                Elements cols = row.select("td");

                // Extract data from columns
                String route = cols.get(0).text();
                if (!route.isEmpty()) {
                    String county = cols.get(1).text();
                    String nearbyPlace = cols.get(2).text();
                    String cameraLink = cols.get(3).selectFirst("a").attr("href");
                    String cameraName = cols.get(3).text();
                    // Insert data into MySQL
                    insertData(conn, nearbyPlace, cameraName, cameraLink, route, county);
                }
            }

            System.out.println("Data inserted successfully.");

        } catch (IOException | SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private static void insertData(Connection conn, String nearbyPlace, String cameraName,
                                   String cameraLink, String route, String county) throws SQLException {
        String insertDataQuery = "INSERT INTO cctv (nearby_place, camera_name, camera_link, route, county) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertDataQuery)) {
            pstmt.setString(1, nearbyPlace);
            pstmt.setString(2, cameraName);
            pstmt.setString(3, cameraLink);
            pstmt.setString(4, route);
            pstmt.setString(5, county);
            pstmt.executeUpdate();
        }
    }
}


//CREATE TABLE cctv (
//id INT AUTO_INCREMENT PRIMARY KEY,
//nearby_place VARCHAR(255),
//camera_name VARCHAR(255),
//camera_link VARCHAR(3000),
//route VARCHAR(255),
//county VARCHAR(255)
//);

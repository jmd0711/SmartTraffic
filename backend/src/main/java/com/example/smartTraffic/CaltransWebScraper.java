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

            // Extract nearby places
            Element nearbyPlacesElement = doc.selectFirst("div.nearbyPlaces");
            String nearbyPlaces = nearbyPlacesElement.text();

            // Extract streaming camera information
            Element cameraListElement = doc.selectFirst("div.cameraList");
            Elements cameraElements = cameraListElement.select("div.camera");

            // Connect to MySQL database
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/your_database", "username", "password");

            // Insert nearby places into MySQL
            insertNearbyPlaces(conn, nearbyPlaces);

            // Insert streaming camera information into MySQL
            insertCameraData(conn, cameraElements);

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

    private static void insertNearbyPlaces(Connection conn, String nearbyPlaces) throws SQLException {
        String insertNearbyPlacesQuery = "INSERT INTO nearby_places (place_name) VALUES (?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertNearbyPlacesQuery)) {
            pstmt.setString(1, nearbyPlaces);
            pstmt.executeUpdate();
        }
    }

    private static void insertCameraData(Connection conn, Elements cameraElements) throws SQLException {
        String insertCameraQuery = "INSERT INTO streaming_cameras (camera_name, location, camera_link) VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertCameraQuery)) {
            for (Element camera : cameraElements) {
                String cameraName = camera.selectFirst("h3").text();
                String cameraLocation = camera.selectFirst("p").text();
                String cameraLink = camera.selectFirst("a").attr("href");

                pstmt.setString(1, cameraName);
                pstmt.setString(2, cameraLocation);
                pstmt.setString(3, cameraLink);
                pstmt.executeUpdate();
            }
        }
    }
}

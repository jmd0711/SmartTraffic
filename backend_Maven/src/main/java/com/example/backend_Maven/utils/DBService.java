package com.example.backend_Maven.utils;

import com.example.backend_Maven.IotDataProcessing;
import com.example.backend_Maven.TrafficEventsProcessing;
import com.example.backend_Maven.dataProcessing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DBService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void truncateTable(String tableName) {
        String truncateQuery = "TRUNCATE TABLE " + tableName;
        jdbcTemplate.execute(truncateQuery);
    }

    public void runAnotherJavaProgram() {
        // Call the main method of the other Java program
        dataProcessing.main(new String[] {});
        TrafficEventsProcessing.main(new String[] {});
        IotDataProcessing.main(new String[] {});
    }
}

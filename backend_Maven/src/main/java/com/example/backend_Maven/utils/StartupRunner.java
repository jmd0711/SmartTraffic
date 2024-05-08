package com.example.backend_Maven.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements CommandLineRunner {

    @Autowired
    private DBService databaseService;

    @Override
    public void run(String... args) throws Exception {
        databaseService.truncateTable("cctv");
        databaseService.truncateTable("event");
        databaseService.truncateTable("iot");
        databaseService.runAnotherJavaProgram();
    }
}

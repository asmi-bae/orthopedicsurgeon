package com.orthopedic.api.shared.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Utility to test database connection and performance optimization.
 * Can be run as a standalone Spring Boot app or as a component.
 */
@Component
@Profile("db-test")
public class DbConnectionTester implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DbConnectionTester.class);

    @Autowired
    private DataSource dataSource;

    @Override
    public void run(String... args) {
        logger.info("🚀 Starting Database Connection Test...");
        long startTime = System.currentTimeMillis();

        try (Connection connection = dataSource.getConnection()) {
            logger.info("✅ Successfully connected to: " + connection.getMetaData().getURL());
            logger.info("📦 Driver Version: " + connection.getMetaData().getDriverVersion());

            // Simple query to verify and measure performance
            try (PreparedStatement ps = connection.prepareStatement("SELECT current_database(), now()")) {
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        logger.info("📂 Current Database: " + rs.getString(1));
                        logger.info("⏰ Server Time: " + rs.getTimestamp(2));
                    }
                }
            }

            long endTime = System.currentTimeMillis();
            logger.info("✨ Connection and Test Query successful! Time taken: " + (endTime - startTime) + "ms");

        } catch (SQLException e) {
            logger.error("❌ Database Connection Failed!");
            logger.error("Error Code: " + e.getErrorCode());
            logger.error("SQL State: " + e.getSQLState());
            logger.error("Message: " + e.getMessage(), e);
        }
    }
}

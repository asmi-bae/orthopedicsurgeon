package com.orthopedic.api;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Standalone JDBC test utility (No Spring dependencies required).
 * Run with: java -cp ".:postgresql.jar" PostgresqlExample
 */
public class PostgresqlExample {
    public static void main(String[] args) {
        String url = System.getenv("SPRING_DATASOURCE_URL");
        String user = System.getenv("SPRING_DATASOURCE_USERNAME");
        String password = System.getenv("SPRING_DATASOURCE_PASSWORD");

        if (url == null || user == null || password == null) {
            System.out.println("❌ Error: Missing environment variables.");
            System.out.println(
                    "Make sure SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, and SPRING_DATASOURCE_PASSWORD are set.");
            return;
        }

        System.out.println("🚀 Attempting connection to: " + url);

        try (final Connection connection = DriverManager.getConnection(url, user, password);
                final Statement statement = connection.createStatement();
                final ResultSet resultSet = statement.executeQuery("SELECT version()")) {

            if (resultSet.next()) {
                System.out.println("✅ Connection Successful!");
                System.out.println("Version: " + resultSet.getString("version"));
            }
        } catch (SQLException e) {
            System.out.println("❌ Connection failure.");
            e.printStackTrace();
        }
    }
}

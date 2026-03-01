package com.orthopedic.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class OrthopedicApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrthopedicApplication.class, args);
    }
}

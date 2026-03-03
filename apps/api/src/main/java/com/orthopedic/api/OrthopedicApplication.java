package com.orthopedic.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EntityScan(basePackages = "com.orthopedic.api")
@EnableJpaRepositories(basePackages = "com.orthopedic.api")
@EnableCaching
@EnableAsync
@EnableScheduling
public class OrthopedicApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrthopedicApplication.class, args);
    }
}

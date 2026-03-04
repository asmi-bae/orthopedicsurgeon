package com.orthopedic.api.config;

import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.jedis.cas.JedisBasedProxyManager;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Configuration
public class RateLimiterConfig {

    @Bean
    public ProxyManager<String> proxyManager(JedisPool jedisPool) {
        ProxyManager<byte[]> byteManager = JedisBasedProxyManager.builderFor(jedisPool)
                .withExpirationStrategy(
                        io.github.bucket4j.distributed.ExpirationAfterWriteStrategy
                                .basedOnTimeForRefillingBucketUpToMax(Duration.ofDays(1)))
                .build();

        return byteManager.withMapper(key -> key.getBytes(StandardCharsets.UTF_8));
    }

    @Bean
    public JedisPool jedisPool() {
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        // Disable JMX to avoid MBean registration conflict with Spring Boot's
        // Lettuce/Redis connection pool which also registers a GenericObjectPool MBean
        poolConfig.setJmxEnabled(false);
        poolConfig.setMaxTotal(10);
        poolConfig.setMaxIdle(5);
        poolConfig.setMinIdle(1);
        return new JedisPool(poolConfig, "localhost", 6379);
    }
}

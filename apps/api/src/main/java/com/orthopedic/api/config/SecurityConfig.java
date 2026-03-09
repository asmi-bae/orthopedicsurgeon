package com.orthopedic.api.config;

import com.orthopedic.api.auth.security.*;
import com.orthopedic.api.security.filter.AdminIpAllowlistFilter;
import com.orthopedic.api.security.filter.JwtAuthenticationFilter;
import com.orthopedic.api.security.filter.RateLimitFilter;
import com.orthopedic.api.security.filter.SecurityHeadersFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

        private static final String[] PUBLIC_GET_URLS = {
                        "/api/v1/public/auth/verify-email/**",
                        "/api/v1/public/auth/login/google",
                        "/api/v1/public/auth/oauth2/callback/google",
                        "/api/v1/public/auth/check-email",
                        "/api/v1/public/booking/check-slot",
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/oauth2/**",
                        "/actuator/**",
                        "/ws/**"
        };

        private static final String[] PUBLIC_POST_URLS = {
                        "/api/v1/public/auth/login",
                        "/api/v1/public/auth/register/patient",
                        "/api/v1/public/auth/refresh",
                        "/api/v1/public/auth/forgot-password/**",
                        "/api/v1/public/auth/reset-password/**",
                        "/api/v1/public/auth/login/passkey/begin",
                        "/api/v1/public/auth/login/passkey/complete",
                        "/api/v1/public/auth/login/mfa-verify",
                        "/api/v1/public/auth/resend-verification",
                        "/api/v1/public/auth/token/verify",
                        "/api/v1/doctor/auth/login",
                        "/api/v1/doctor/auth/login/mfa",
                        "/api/v1/doctor/auth/refresh"
        };

        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final SecurityHeadersFilter securityHeadersFilter;
        private final RateLimitFilter rateLimitingFilter;
        private final AdminIpAllowlistFilter adminIpAllowlistFilter;
        private final OAuth2UserService oauth2UserService;
        private final OAuth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;
        private final OAuth2AuthenticationFailureHandler oauth2AuthenticationFailureHandler;
        private final CorsConfigurationSource corsConfigurationSource;

        public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                        SecurityHeadersFilter securityHeadersFilter,
                        RateLimitFilter rateLimitingFilter,
                        AdminIpAllowlistFilter adminIpAllowlistFilter,
                        OAuth2UserService oauth2UserService,
                        OAuth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler,
                        OAuth2AuthenticationFailureHandler oauth2AuthenticationFailureHandler,
                        CorsConfigurationSource corsConfigurationSource) {
                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
                this.securityHeadersFilter = securityHeadersFilter;
                this.rateLimitingFilter = rateLimitingFilter;
                this.adminIpAllowlistFilter = adminIpAllowlistFilter;
                this.oauth2UserService = oauth2UserService;
                this.oauth2AuthenticationSuccessHandler = oauth2AuthenticationSuccessHandler;
                this.oauth2AuthenticationFailureHandler = oauth2AuthenticationFailureHandler;
                this.corsConfigurationSource = corsConfigurationSource;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                // 🔒 SECURITY: disable CSRF as we use stateless JWT
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                                                .requestMatchers(org.springframework.http.HttpMethod.GET, PUBLIC_GET_URLS).permitAll()
                                                .requestMatchers(org.springframework.http.HttpMethod.POST, PUBLIC_POST_URLS).permitAll()
                                                // Group B-H (except blog comments POST) are public mostly on GET
                                                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/v1/public/**").permitAll()
                                                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/v1/public/contact/**", "/api/v1/public/newsletter/**").permitAll()
                                                .requestMatchers("/actuator/health", "/actuator/info").permitAll()
                                                .requestMatchers("/actuator/**").hasAuthority("ROLE_SUPER_ADMIN")
                                                .requestMatchers("/api/v1/doctor/website/**").hasAnyRole("SUPER_ADMIN", "DOCTOR_ADMIN")
                                                .requestMatchers("/api/v1/doctor/**").hasRole("SUPER_ADMIN")
                                                .requestMatchers("/api/v1/admin/**").hasRole("DOCTOR_ADMIN")
                                                .requestMatchers("/api/v1/patient/**").hasAnyRole("PATIENT", "DOCTOR_ADMIN", "SUPER_ADMIN")
                                                .anyRequest().authenticated())
                                .oauth2Login(oauth2 -> oauth2
                                                .userInfoEndpoint(userInfo -> userInfo.userService(oauth2UserService))
                                                .successHandler(oauth2AuthenticationSuccessHandler)
                                                .failureHandler(oauth2AuthenticationFailureHandler))
                                .exceptionHandling(exceptions -> exceptions
                                                .defaultAuthenticationEntryPointFor(
                                                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                                                                new AntPathRequestMatcher("/api/**"))
                                                .authenticationEntryPoint(
                                                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));

                // Add Filters
                http.addFilterBefore(securityHeadersFilter,
                                org.springframework.security.web.header.HeaderWriterFilter.class);
                http.addFilterBefore(adminIpAllowlistFilter,
                                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);
                http.addFilterBefore(jwtAuthenticationFilter,
                                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);
                // Important: RateLimitingFilter goes AFTER JwtAuthenticationFilter so it has access to the SecurityContext
                http.addFilterAfter(rateLimitingFilter, JwtAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                // ⚡ PERF: BCrypt with strength 10 (Much faster than 12, still very secure)
                return new BCryptPasswordEncoder(10);
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }
}

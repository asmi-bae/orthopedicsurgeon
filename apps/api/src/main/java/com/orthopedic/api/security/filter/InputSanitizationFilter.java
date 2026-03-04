package com.orthopedic.api.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.text.Normalizer;
import java.util.Set;

@Component
@Slf4j
public class InputSanitizationFilter extends OncePerRequestFilter {

    private static final Set<String> ALLOWED_METHODS = Set.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS");
    private static final Set<String> FORBIDDEN_HEADERS = Set.of("X-HTTP-Method-Override", "X-Method-Override");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Method validation
        if (!ALLOWED_METHODS.contains(request.getMethod())) {
            sendError(response, "METHOD_NOT_ALLOWED", "Invalid HTTP method");
            return;
        }

        // 2. Method override check
        for (String forbidden : FORBIDDEN_HEADERS) {
            if (request.getHeader(forbidden) != null) {
                sendError(response, "FORBIDDEN_HEADER", "Method override not allowed");
                return;
            }
        }

        // 3. Null byte and Path Traversal Check in URI
        String uri = Normalizer.normalize(request.getRequestURI(), Normalizer.Form.NFC);
        if (uri.contains("\0") || uri.contains("%00") || isPathTraversal(uri)) {
            sendError(response, "INVALID_REQUEST", "Suspicious characters detected in URI");
            return;
        }

        // 4. CRLF Injection in headers
        var headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String name = headerNames.nextElement();
            String value = request.getHeader(name);
            if (value != null && (value.contains("\r") || value.contains("\n") || value.contains("%0d")
                    || value.contains("%0a"))) {
                sendError(response, "HEADER_INJECTION", "CRLF detected in headers");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean isPathTraversal(String uri) {
        return uri.contains("../") || uri.contains("..\\") || uri.contains("%2e%2e") || uri.contains("%252e");
    }

    private void sendError(HttpServletResponse response, String code, String message) throws IOException {
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(String.format("{\"code\": \"%s\", \"message\": \"%s\"}", code, message));
    }
}

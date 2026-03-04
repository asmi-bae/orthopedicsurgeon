package com.orthopedic.api.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RequestSizeLimitFilter extends OncePerRequestFilter {

    private static final long MAX_JSON_SIZE = 100 * 1024; // 100KB
    private static final long MAX_UPLOAD_SIZE = 20 * 1024 * 1024; // 20MB
    private static final int MAX_URL_LENGTH = 2048;
    private static final int MAX_HEADER_VALUE = 8192;
    private static final int MAX_HEADER_COUNT = 100;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. URL Length check
        if (request.getRequestURL().length() > MAX_URL_LENGTH) {
            sendError(response, "URI_TOO_LONG", "Request URI is too long");
            return;
        }

        // 2. Header count check
        int headerCount = 0;
        var headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            headerCount++;
            String name = headerNames.nextElement();
            if (request.getHeader(name).length() > MAX_HEADER_VALUE) {
                sendError(response, "HEADER_TOO_LARGE", "Header value exceeds limit");
                return;
            }
        }
        if (headerCount > MAX_HEADER_COUNT) {
            sendError(response, "TOO_MANY_HEADERS", "Too many headers");
            return;
        }

        // 3. Content length check
        long contentLength = request.getContentLengthLong();
        String contentType = request.getContentType();

        if (contentLength > 0) {
            if (contentType != null && contentType.contains("multipart/form-data")) {
                if (contentLength > MAX_UPLOAD_SIZE) {
                    sendError(response, "PAYLOAD_TOO_LARGE", "File upload exceeds 20MB limit");
                    return;
                }
            } else {
                if (contentLength > MAX_JSON_SIZE) {
                    sendError(response, "PAYLOAD_TOO_LARGE", "JSON payload exceeds 100KB limit");
                    return;
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private void sendError(HttpServletResponse response, String code, String message) throws IOException {
        response.setStatus(HttpStatus.PAYLOAD_TOO_LARGE.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(String.format("{\"code\": \"%s\", \"message\": \"%s\"}", code, message));
    }
}

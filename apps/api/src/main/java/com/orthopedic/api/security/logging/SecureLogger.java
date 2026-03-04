package com.orthopedic.api.security.logging;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SecureLogger {

    public static String sanitize(String input) {
        if (input == null)
            return "null";
        return input
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t")
                .replaceAll("[^\n" +
                        "\\x20-\\x7E]", "?")
                .substring(0, Math.min(input.length(), 500));
    }

    public static void info(String message, Object... args) {
        log.info(message, sanitizeArgs(args));
    }

    public static void warn(String message, Object... args) {
        log.warn(message, sanitizeArgs(args));
    }

    public static void error(String message, Object... args) {
        log.error(message, sanitizeArgs(args));
    }

    private static Object[] sanitizeArgs(Object[] args) {
        if (args == null)
            return null;
        Object[] sanitized = new Object[args.length];
        for (int i = 0; i < args.length; i++) {
            if (args[i] instanceof String s) {
                sanitized[i] = sanitize(s);
            } else {
                sanitized[i] = args[i];
            }
        }
        return sanitized;
    }
}

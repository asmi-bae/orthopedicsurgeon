package com.orthopedic.api.auth.dto;

public class RegisterResponse {
    private Long userId;
    private String email;
    private String message;

    public RegisterResponse() {
    }

    public RegisterResponse(Long userId, String email, String message) {
        this.userId = userId;
        this.email = email;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static RegisterResponseBuilder builder() {
        return new RegisterResponseBuilder();
    }

    public static class RegisterResponseBuilder {
        private Long userId;
        private String email;
        private String message;

        public RegisterResponseBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public RegisterResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public RegisterResponseBuilder message(String message) {
            this.message = message;
            return this;
        }

        public RegisterResponse build() {
            return new RegisterResponse(userId, email, message);
        }
    }
}

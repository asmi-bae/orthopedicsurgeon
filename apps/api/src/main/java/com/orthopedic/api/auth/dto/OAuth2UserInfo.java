package com.orthopedic.api.auth.dto;

public class OAuth2UserInfo {
    private String id;
    private String email;
    private String name;
    private String imageUrl;
    private String provider;

    public OAuth2UserInfo() {
    }

    public OAuth2UserInfo(String id, String email, String name, String imageUrl, String provider) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.imageUrl = imageUrl;
        this.provider = provider;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public static OAuth2UserInfoBuilder builder() {
        return new OAuth2UserInfoBuilder();
    }

    public static class OAuth2UserInfoBuilder {
        private String id;
        private String email;
        private String name;
        private String imageUrl;
        private String provider;

        public OAuth2UserInfoBuilder id(String id) {
            this.id = id;
            return this;
        }

        public OAuth2UserInfoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public OAuth2UserInfoBuilder name(String name) {
            this.name = name;
            return this;
        }

        public OAuth2UserInfoBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public OAuth2UserInfoBuilder provider(String provider) {
            this.provider = provider;
            return this;
        }

        public OAuth2UserInfo build() {
            return new OAuth2UserInfo(id, email, name, imageUrl, provider);
        }
    }
}

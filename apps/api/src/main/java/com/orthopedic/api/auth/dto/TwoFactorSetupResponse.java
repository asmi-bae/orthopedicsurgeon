package com.orthopedic.api.auth.dto;

import java.util.List;

public class TwoFactorSetupResponse {
    private String qrCodeUrl;
    private String secretKey;
    private List<String> backupCodes;

    public TwoFactorSetupResponse() {
    }

    public TwoFactorSetupResponse(String qrCodeUrl, String secretKey, List<String> backupCodes) {
        this.qrCodeUrl = qrCodeUrl;
        this.secretKey = secretKey;
        this.backupCodes = backupCodes;
    }

    public String getQrCodeUrl() {
        return qrCodeUrl;
    }

    public void setQrCodeUrl(String qrCodeUrl) {
        this.qrCodeUrl = qrCodeUrl;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public List<String> getBackupCodes() {
        return backupCodes;
    }

    public void setBackupCodes(List<String> backupCodes) {
        this.backupCodes = backupCodes;
    }

    public static TwoFactorSetupResponseBuilder builder() {
        return new TwoFactorSetupResponseBuilder();
    }

    public static class TwoFactorSetupResponseBuilder {
        private String qrCodeUrl;
        private String secretKey;
        private List<String> backupCodes;

        public TwoFactorSetupResponseBuilder qrCodeUrl(String qrCodeUrl) {
            this.qrCodeUrl = qrCodeUrl;
            return this;
        }

        public TwoFactorSetupResponseBuilder secretKey(String secretKey) {
            this.secretKey = secretKey;
            return this;
        }

        public TwoFactorSetupResponseBuilder backupCodes(List<String> backupCodes) {
            this.backupCodes = backupCodes;
            return this;
        }

        public TwoFactorSetupResponse build() {
            return new TwoFactorSetupResponse(qrCodeUrl, secretKey, backupCodes);
        }
    }
}

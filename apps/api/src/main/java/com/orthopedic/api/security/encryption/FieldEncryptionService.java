package com.orthopedic.api.security.encryption;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.security.SecureRandom;
import java.util.Base64;

@Service
@Slf4j
public class FieldEncryptionService {

    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int TAG_LENGTH_BIT = 128;
    private static final int IV_LENGTH_BYTE = 12;

    @Value("${security.encryption.key:DEFAULT_KEY_PLEASE_REPLACE_IN_PROD_123456}")
    private String encryptionKey;

    public String encrypt(String strToEncrypt) {
        try {
            byte[] iv = new byte[IV_LENGTH_BYTE];
            new SecureRandom().nextBytes(iv);

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            GCMParameterSpec spec = new GCMParameterSpec(TAG_LENGTH_BIT, iv);
            cipher.init(Cipher.ENCRYPT_MODE, getSecretKey(), spec);

            byte[] cipherText = cipher.doFinal(strToEncrypt.getBytes());

            ByteBuffer byteBuffer = ByteBuffer.allocate(iv.length + cipherText.length);
            byteBuffer.put(iv);
            byteBuffer.put(cipherText);

            return Base64.getEncoder().encodeToString(byteBuffer.array());
        } catch (Exception e) {
            log.error("❌ Encryption error: {}", e.getMessage());
            return null;
        }
    }

    public String decrypt(String strToDecrypt) {
        try {
            byte[] decode = Base64.getDecoder().decode(strToDecrypt);
            ByteBuffer byteBuffer = ByteBuffer.wrap(decode);

            byte[] iv = new byte[IV_LENGTH_BYTE];
            byteBuffer.get(iv);

            byte[] cipherText = new byte[byteBuffer.remaining()];
            byteBuffer.get(cipherText);

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            GCMParameterSpec spec = new GCMParameterSpec(TAG_LENGTH_BIT, iv);
            cipher.init(Cipher.DECRYPT_MODE, getSecretKey(), spec);

            return new String(cipher.doFinal(cipherText));
        } catch (Exception e) {
            log.error("❌ Decryption error: {}", e.getMessage());
            return null;
        }
    }

    private SecretKeySpec getSecretKey() {
        byte[] key = encryptionKey.getBytes();
        // Ensure key is exactly 32 bytes for AES-256
        byte[] finalKey = new byte[32];
        System.arraycopy(key, 0, finalKey, 0, Math.min(key.length, 32));
        return new SecretKeySpec(finalKey, "AES");
    }
}

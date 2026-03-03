package com.orthopedic.api.shared.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class SmsServiceImpl implements SmsService {
    private static final Logger log = LoggerFactory.getLogger(SmsServiceImpl.class);

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.from-number}")
    private String fromNumber;

    @PostConstruct
    public void init() {
        try {
            if (accountSid != null && !accountSid.isEmpty() && !"your_sid".equals(accountSid)) {
                Twilio.init(accountSid, authToken);
            } else {
                log.warn("Twilio credentials not provided or are placeholders. SMS service will not be available.");
            }
        } catch (Exception e) {
            log.error("Failed to initialize Twilio. SMS service will not be available.", e);
        }
    }

    @Override
    @Async
    public void sendSms(String to, String message) {
        try {
            Message.creator(
                    new PhoneNumber(to),
                    new PhoneNumber(fromNumber),
                    message).create();
            log.info("SMS sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send SMS to: {}", to, e);
        }
    }
}

package com.orthopedic.api.auth.service;

import com.orthopedic.api.auth.dto.*;
import com.orthopedic.api.auth.entity.*;
import com.orthopedic.api.auth.exception.InvalidCredentialsException;
import com.orthopedic.api.auth.repository.*;
import com.orthopedic.api.auth.security.JwtTokenProvider;
import com.orthopedic.api.config.JwtConfig;
import com.orthopedic.api.security.service.AuditService;
import com.orthopedic.api.auth.service.AuthServiceImpl;
import com.orthopedic.api.auth.service.TokenService;
import com.orthopedic.api.shared.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtTokenProvider tokenProvider;
    @Mock
    private JwtConfig jwtConfig;
    @Mock
    private AuditService auditService;
    @Mock
    private RedisTemplate<String, Object> redisTemplate;
    @Mock
    private ValueOperations<String, Object> valueOperations;
    @Mock
    private TokenService tokenService;
    @Mock
    private SessionRepository sessionRepository;
    @Mock
    private VerificationTokenRepository verificationTokenRepository;
    @Mock
    private PasswordResetTokenRepository passwordResetTokenRepository;
    @Mock
    private EmailService emailService;
    @Mock
    private TwoFactorService twoFactorService;

    @InjectMocks
    private AuthServiceImpl authService;

    private User testUser;
    private Role patientRole;

    @BeforeEach
    void setUp() {
        patientRole = new Role();
        patientRole.setName("PATIENT");

        testUser = new User();
        testUser.setId(UUID.fromString("123e4567-e89b-12d3-a456-426614174000"));
        testUser.setEmail("test@example.com");
        testUser.setPassword("hashedPassword");
        testUser.setRoles(Set.of(patientRole));
        testUser.setEnabled(true);

        lenient().when(redisTemplate.opsForValue()).thenReturn(valueOperations);
    }

    @Test
    void login_Success_Patient() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        when(tokenProvider.generateAccessToken(any(), anyString())).thenReturn("accessToken");
        when(jwtConfig.getAccessTokenExpiry()).thenReturn(900L);

        LoginResponse response = authService.login(request, "127.0.0.1", "device");

        assertNotNull(response);
        assertEquals("accessToken", response.getAccessToken());
        assertFalse(response.isRequiresMfa());
        verify(auditService).logAudit(any(), any(), any(), eq("SUCCESS"));
    }

    @Test
    void login_Failure_WrongCredentials() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("wrong");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> authService.login(request, "127.0.0.1", "device"));
        verify(auditService).logAudit(any(), any(), any(), eq("FAILURE"));
    }

    @Test
    void refreshToken_Success() {
        String token = "validToken";
        when(tokenService.getEmailFromToken(token)).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(tokenProvider.generateAccessToken(any(), anyString())).thenReturn("newAccessToken");
        when(jwtConfig.getAccessTokenExpiry()).thenReturn(900L);
        when(tokenService.generateAndSaveRefreshToken(any(), anyString())).thenReturn("newRefreshToken");

        TokenResponse response = authService.refreshToken(token);

        assertNotNull(response);
        assertEquals("newAccessToken", response.getAccessToken());
        assertEquals("newRefreshToken", response.getRefreshToken());
        verify(tokenService).deleteRefreshToken(token);
    }
}

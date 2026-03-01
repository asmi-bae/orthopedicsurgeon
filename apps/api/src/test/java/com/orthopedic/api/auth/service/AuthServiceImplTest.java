package com.orthopedic.api.auth.service;

import com.orthopedic.api.auth.dto.*;
import com.orthopedic.api.auth.entity.*;
import com.orthopedic.api.auth.exception.AuthException;
import com.orthopedic.api.auth.exception.InvalidCredentialsException;
import com.orthopedic.api.auth.repository.*;
import com.orthopedic.api.auth.security.JwtTokenProvider;
import com.orthopedic.api.config.JwtConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock private UserRepository userRepository;
    @Mock private RoleRepository roleRepository;
    @Mock private RefreshTokenRepository refreshTokenRepository;
    @Mock private LoginAuditRepository loginAuditRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private JwtTokenProvider tokenProvider;
    @Mock private JwtConfig jwtConfig;
    @Mock private RedisTemplate<String, Object> redisTemplate;
    @Mock private ValueOperations<String, Object> valueOperations;

    @InjectMocks private AuthServiceImpl authService;

    private User testUser;
    private Role patientRole;

    @BeforeEach
    void setUp() {
        patientRole = new Role();
        patientRole.setName("ROLE_PATIENT");

        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setPassword("hashedPassword");
        testUser.setRoles(Set.of(patientRole));
        testUser.setEnabled(true);
    }

    @Test
    void login_Success_Patient() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");

        Authentication auth = mock(Authentication.class);
        when(authenticationManager.authenticate(any())).thenReturn(auth);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(tokenProvider.generateAccessToken(any())).thenReturn("accessToken");
        when(jwtConfig.getAccessTokenExpiry()).thenReturn(900L);
        when(jwtConfig.getRefreshTokenExpiry()).thenReturn(604800L);

        LoginResponse response = authService.login(request, "127.0.0.1", "device");

        assertNotNull(response);
        assertEquals("accessToken", response.getAccessToken());
        assertFalse(response.isRequiresTwoFactor());
        verify(loginAuditRepository).save(any());
    }

    @Test
    void login_Failure_WrongCredentials() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("wrong");

        when(authenticationManager.authenticate(any())).thenThrow(new InvalidCredentialsException("Invalid"));

        assertThrows(InvalidCredentialsException.class, () -> authService.login(request, "127.0.0.1", "device"));
    }

    @Test
    void register_Success() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("new@example.com");
        request.setPassword("password");
        request.setFirstName("John");
        request.setLastName("Doe");

        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashed");
        when(roleRepository.findByName("ROLE_PATIENT")).thenReturn(Optional.of(patientRole));
        when(userRepository.save(any())).thenReturn(testUser);

        RegisterResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("test@example.com", response.getEmail());
    }

    @Test
    void refreshToken_Success() {
        String oldToken = "oldToken";
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(testUser);
        refreshToken.setTokenHash(oldToken);
        refreshToken.setExpiryDate(LocalDateTime.now().plusDays(1));

        when(refreshTokenRepository.findByTokenHash(oldToken)).thenReturn(Optional.of(refreshToken));
        when(tokenProvider.generateAccessToken(any())).thenReturn("newAccessToken");
        when(jwtConfig.getAccessTokenExpiry()).thenReturn(900L);

        TokenResponse response = authService.refreshToken(oldToken);

        assertNotNull(response);
        assertEquals("newAccessToken", response.getAccessToken());
        verify(refreshTokenRepository).delete(refreshToken);
    }
}

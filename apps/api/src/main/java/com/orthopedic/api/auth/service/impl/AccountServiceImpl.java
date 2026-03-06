package com.orthopedic.api.auth.service.impl;

import com.orthopedic.api.auth.dto.UserDto;
import com.orthopedic.api.auth.dto.request.UpdateProfileRequest;
import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.auth.repository.UserRepository;
import com.orthopedic.api.auth.service.AccountService;
import com.orthopedic.api.shared.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDto updateProfile(User currentUser, UpdateProfileRequest request) {
        currentUser.setFirstName(request.getFirstName());
        currentUser.setLastName(request.getLastName());
        currentUser.setPhone(request.getPhone());
        currentUser.setGender(request.getGender());
        // imageUrl support can be added when storage is implemented
        
        return UserDto.fromEntity(userRepository.save(currentUser));
    }

    @Override
    @Transactional
    public void changePassword(User currentUser, String oldPassword, String newPassword) {
        if (!passwordEncoder.matches(oldPassword, currentUser.getPassword())) {
            throw new BadRequestException("Current password does not match");
        }
        
        currentUser.setPassword(passwordEncoder.encode(newPassword));
        currentUser.setPasswordChangedAt(LocalDateTime.now());
        userRepository.save(currentUser);
    }
}

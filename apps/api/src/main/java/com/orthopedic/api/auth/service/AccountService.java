package com.orthopedic.api.auth.service;

import com.orthopedic.api.auth.dto.UserDto;
import com.orthopedic.api.auth.dto.request.UpdateProfileRequest;
import com.orthopedic.api.auth.entity.User;

public interface AccountService {
    UserDto updateProfile(User currentUser, UpdateProfileRequest request);
    void changePassword(User currentUser, String oldPassword, String newPassword);
}

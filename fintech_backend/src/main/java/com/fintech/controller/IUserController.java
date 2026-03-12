package com.fintech.controller;

import com.fintech.controller.base.RootEntity;
import com.fintech.dto.UserDto;
import com.fintech.entities.user.User;
import com.fintech.entities.user.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface IUserController {
    RootEntity<UserResponse> signUp(User user);

    RootEntity<UserResponse> login(User user);

     ResponseEntity<UserDto> me(Authentication authentication);
}

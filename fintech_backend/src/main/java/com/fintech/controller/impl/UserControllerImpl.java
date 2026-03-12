package com.fintech.controller.impl;

import com.fintech.controller.IUserController;
import com.fintech.controller.base.RootEntity;
import com.fintech.dto.UserDto;
import com.fintech.entities.user.User;
import com.fintech.entities.user.UserResponse;
import com.fintech.security.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/auth")
public class UserControllerImpl implements IUserController {

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    @PostMapping("/save")
    public RootEntity<UserResponse> signUp(@RequestBody User user) {
        return RootEntity.ok(authenticationService.signUp(user));
    }

    @Override
    @PostMapping("/login")
    public RootEntity<UserResponse> login(@RequestBody User user) {
        return RootEntity.ok(authenticationService.login(user));
    }

    @Override
    @GetMapping("/me")
    public ResponseEntity<UserDto> me(Authentication authentication) {
        if (authentication == null ||
                !(authentication.getPrincipal() instanceof User user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(
                new UserDto(
                        user.getId(),
                        user.getUsername()
                )
        );
    }
}

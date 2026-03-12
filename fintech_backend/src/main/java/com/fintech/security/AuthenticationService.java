package com.fintech.security;

import com.fintech.entities.user.User;
import com.fintech.entities.user.UserResponse;
import com.fintech.exception.BaseException;
import com.fintech.exception.ErrorMessage;
import com.fintech.exception.MessageType;
import com.fintech.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse signUp(User user) {
        Optional<User> existsUser = userRepository.findByUsername(user.getUsername());

        if(existsUser.isPresent()) {
            throw new BaseException(new ErrorMessage(MessageType.KULLANCI_MEVCUT));
        }
        if(user.getPassword().length() < 6) {
            throw new BaseException(new ErrorMessage(MessageType.SIFRE_KARAKTER_YETERSIZ));
        }

        User newUser = User.builder().username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .build();

        userRepository.save(newUser);
        var token = jwtService.generateToken(newUser);

        return UserResponse.builder().token(token).build();
    }

    public UserResponse login(User user) {
        User newUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.KULLANCI_BULUNAMADI)));
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    user.getUsername(), user.getPassword()
            ));
        } catch (BadCredentialsException e) {
            throw new BaseException(new ErrorMessage(MessageType.SIFRE_HATALI));
        }
        String token = jwtService.generateToken(newUser);
        return UserResponse.builder().token(token).build();
    }
}

package com.civiceye.user_service.service;

import com.civiceye.user_service.dto.LoginRequest;
import com.civiceye.user_service.dto.LoginResponse;
import com.civiceye.user_service.dto.RegisterRequest;
import com.civiceye.user_service.entity.User;
import com.civiceye.user_service.repository.UserRepository;
import com.civiceye.user_service.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public ResponseEntity<?> register(RegisterRequest request){

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email already exists"));
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("CITIZEN") // 🔐 FIX THIS ALSO
                .build();

        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of("message", "User Registered Successfully")
        );
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        
        return new LoginResponse(
                token,
                user.getRole()
        );
    }
}

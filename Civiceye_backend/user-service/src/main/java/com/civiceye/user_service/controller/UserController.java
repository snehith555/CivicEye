package com.civiceye.user_service.controller;


import com.civiceye.user_service.dto.LoginRequest;
import com.civiceye.user_service.dto.LoginResponse;
import com.civiceye.user_service.dto.RegisterRequest;
import com.civiceye.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @GetMapping("/whoami")
    public String whoAmI() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin-only")
    public String adminOnly() {
        return "Welcome Admin!";
    }
}

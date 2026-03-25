package com.civiceye.user_service.dto;

public record LoginResponse(
        String token,
        String role
) {}

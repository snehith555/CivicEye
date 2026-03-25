package com.civiceye.ai_service.dto;

public record AiResponse(
        String category,
        String priority,
        String department,
        String summary
){
}

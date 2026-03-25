package com.civiceye.report_service.dto;

public record AiResponse(
        String category,
        String priority,
        String department,
        String summary
) {}

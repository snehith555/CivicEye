package com.civiceye.report_service.dto;

import org.springframework.web.multipart.MultipartFile;

public record CreateReportRequest(
        String title,
        String description,
        String location,
        MultipartFile image
) {}

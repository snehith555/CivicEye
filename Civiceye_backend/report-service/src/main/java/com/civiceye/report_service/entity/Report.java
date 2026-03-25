package com.civiceye.report_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private String imagePath;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String category;
    private String priority;
    private String department;
    private String summary;

    private String createdBy;
    private String userEmail;
}

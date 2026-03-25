package com.civiceye.report_service.repository;

import com.civiceye.report_service.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByCreatedBy(String email);
}

package com.civiceye.report_service.controller;

import com.civiceye.report_service.dto.CreateReportRequest;
import com.civiceye.report_service.entity.Report;
import com.civiceye.report_service.entity.Status;
import com.civiceye.report_service.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('CITIZEN')")
    public Report createReport(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam(required = false) MultipartFile image
    ){

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Report report = new Report();
        report.setTitle(title);
        report.setDescription(description);
        report.setLocation(location);
        report.setCreatedBy(email);

        return reportService.createReport(report, image);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Report>> getMyReports(Authentication authentication) {

        String email = authentication.getName();

        List<Report> reports = reportService.getReportsByUser(email);

        return ResponseEntity.ok(reports);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}/status")
    public Report updateStatus(@PathVariable Long id, @RequestBody Status status){
        return reportService.updateStatus(id, status);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')") 
    public ResponseEntity<List<Report>> getAllReports() {

        List<Report> reports = reportService.getAllReports();

        return ResponseEntity.ok(reports);
    }

}

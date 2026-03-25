package com.civiceye.report_service.service;

import com.civiceye.report_service.dto.AiRequest;
import com.civiceye.report_service.dto.AiResponse;
import com.civiceye.report_service.entity.Report;
import com.civiceye.report_service.entity.Status;
import com.civiceye.report_service.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final WebClient.Builder webClientBuilder;

    public Report createReport(Report report, MultipartFile image) {

        // convert image to base64 and store imagePath
        String base64Image = null;
        String imagePath = null;
        if (image != null && !image.isEmpty()) {

            try {
                String fileName = System.currentTimeMillis() + "_" +image.getOriginalFilename();
                Path uploadDir = Paths.get("uploads");
                Files.createDirectories(uploadDir);

                Path filePath = uploadDir.resolve(fileName);

                byte[] bytes = image.getBytes();

                Files.write(filePath, bytes);
                imagePath =  "uploads/" + fileName;
                base64Image = Base64.getEncoder().encodeToString(bytes);
            } catch (IOException e) {
                throw new RuntimeException("Error processing image", e);
            }
        }
        report.setImagePath(imagePath);
        AiRequest aiRequest = new AiRequest(report.getDescription(), base64Image);

        AiResponse aiResponse = webClientBuilder.build()
                .post()
                .uri("http://AI-SERVICE/api/ai/analyze")
                .bodyValue(aiRequest)
                .retrieve()
                .bodyToMono(AiResponse.class)
                .block();
        System.out.println(aiResponse);

        report.setCategory(aiResponse.category());
        report.setPriority(aiResponse.priority());
        report.setDepartment(aiResponse.department());
        report.setSummary(aiResponse.summary());
        report.setStatus(Status.OPEN);

        return reportRepository.save(report);
    }

    public Report updateStatus(Long id, Status status) {
        Report report = reportRepository.findById(id)
                .orElseThrow(()->new RuntimeException("report not found"));
        report.setStatus(status);

        return reportRepository.save(report);
    }

    public List<Report> getReportsByUser(String email) {
        return reportRepository.findByCreatedBy(email);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
}

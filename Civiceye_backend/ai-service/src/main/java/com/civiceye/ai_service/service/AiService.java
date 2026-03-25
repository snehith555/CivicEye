package com.civiceye.ai_service.service;

import com.civiceye.ai_service.dto.AiResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {

    private final WebClient.Builder webClientBuilder;

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    public AiResponse analyze(String description, String imageBase64) {

        String prompt = """
        You are an AI assistant for a civic complaint management system.

        Analyze the complaint and return:
        
        1. category
        2. priority
        3. department responsible
        4. short summary
        
        Categories:
        GARBAGE, ROAD, WATER, ELECTRICITY, DRAINAGE, STREET LIGHT

        Priorities:
        LOW, MEDIUM, HIGH
        
        Department Mapping:
        ROAD -> Public Works Department
        GARBAGE -> Municipal Waste Department
        WATER -> Water Authority
        STREET LIGHT -> Electricity Department
        DRAINAGE -> Sanitation Department

        Return ONLY JSON in this format:

        {
          "category": "...",
          "priority": "...",
          "department": "...",
          "summary": "..."
        }

        Complaint: %s
        """.formatted(description);

        Map<String, Object> requestBody;

        if (imageBase64 != null && !imageBase64.isEmpty()) {

            requestBody = Map.of(
                    "contents", List.of(
                            Map.of(
                                    "parts", List.of(
                                            Map.of("text", prompt),
                                            Map.of(
                                                    "inline_data", Map.of(
                                                            "mime_type", "image/jpeg",
                                                            "data", imageBase64
                                                    )
                                            )
                                    )
                            )
                    )
            );

        } else {

            // fallback for text-only complaints
            requestBody = Map.of(
                    "contents", List.of(
                            Map.of("parts", List.of(
                                    Map.of("text", prompt)
                            ))
                    )
            );
        }
        String response = webClientBuilder.build()
                .post()
                .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        System.out.println("Gemini Response: " + response);


        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root =mapper.readTree(response);

            // navigate to gemini response structure
            String aiText = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            // convert JSON node into plain string
            aiText = aiText.replace("```json", "")
                    .replace("```", "")
                    .trim();

            JsonNode aiJson = mapper.readTree(aiText);

            String category = aiJson.path("category").asText();
            String priority = aiJson.path("priority").asText();
            String department = aiJson.path("department").asText();
            String summary = aiJson.path("summary").asText();

            return new AiResponse(category, priority, department, summary);
        } catch (Exception e) {
            e.printStackTrace();
            return new AiResponse("UNKNOWN", "LOW","UNKNOWN","AI analysis failed");
        }

    }
}

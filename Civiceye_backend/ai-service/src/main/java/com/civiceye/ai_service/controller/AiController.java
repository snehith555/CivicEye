package com.civiceye.ai_service.controller;

import com.civiceye.ai_service.dto.AiRequest;
import com.civiceye.ai_service.dto.AiResponse;
import com.civiceye.ai_service.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/analyze")
    public AiResponse analyze(@RequestBody AiRequest request){
        return aiService.analyze(request.description(), request.imageBase64());
    }
}

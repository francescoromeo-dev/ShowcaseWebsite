package com.MisterJerry.ShowcaseWebsite.Controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Value("${app.backoffice.url:http://localhost:8080}")
    private String backofficeUrl;

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "Sito Vetrina MisterJerry funzionante");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("service", "sito-vetrina");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/config")
    public ResponseEntity<Map<String, Object>> getConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("service", "MisterJerry Sito Vetrina");
        config.put("backoffice_url", backofficeUrl);
        config.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(config);
    }
}

package com.examease.backend.controller;

import com.examease.backend.dto.LoginDto;
import com.examease.backend.security.JwtUtil;
import com.examease.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AdminController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto dto) {
        // Only allow email: admin@examease.com to login as admin
        if (!"admin@examease.com".equals(dto.getEmail())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only admin account can access admin portal"));
        }
        
        var opt = userService.findByEmail(dto.getEmail());
        if (opt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        var u = opt.get();
        if (!userService.checkPassword(dto.getPassword(), u.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
        if (u.getRole() == null || !u.getRole().name().contains("ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "Not an admin"));
        }
        String token = jwtUtil.generateToken(u.getEmail(), u.getRole().name());
        u.setPassword(null);
        return ResponseEntity.ok(Map.of("token", token, "user", u));
    }
}

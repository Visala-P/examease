package com.examease.backend.controller;

import com.examease.backend.dto.LoginDto;
import com.examease.backend.dto.StudentRegisterDto;
import com.examease.backend.model.User;
import com.examease.backend.security.JwtUtil;
import com.examease.backend.service.UserService;
import org.springframework.security.core.Authentication;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public StudentController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping(value = "/register", consumes = {"multipart/form-data", "application/json"})
    public ResponseEntity<?> register(@Valid @ModelAttribute StudentRegisterDto dto,
                                      @RequestPart(required = false) MultipartFile profilePicture) {
        try {
            User u = userService.registerStudent(dto.getFullName(), dto.getEmail(), dto.getPassword());
            u.setPassword(null);
            return ResponseEntity.ok(u);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto dto) {
        var opt = userService.findByEmail(dto.getEmail());
        if (opt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        var u = opt.get();
        if (!userService.checkPassword(dto.getPassword(), u.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
        String token = jwtUtil.generateToken(u.getEmail(), u.getRole().name());
        u.setPassword(null);
        return ResponseEntity.ok(Map.of("token", token, "user", u));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        String email = authentication.getName();
        var opt = userService.findByEmail(email);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        var u = opt.get();
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }

    public static class UpdateProfileDto {
        public String name;
        public String email;
        public String password; // optional
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMe(@RequestBody UpdateProfileDto dto, Authentication authentication) {
        String email = authentication.getName();
        var opt = userService.findByEmail(email);
        if (opt.isEmpty()) return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        User u = opt.get();
        if (dto.name != null && !dto.name.isBlank()) u.setName(dto.name);
        if (dto.email != null && !dto.email.isBlank()) u.setEmail(dto.email);
        if (dto.password != null && !dto.password.isBlank()) {
            u.setPassword(userService.encodePassword(dto.password));
        }
        var saved = userService.save(u);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }
}

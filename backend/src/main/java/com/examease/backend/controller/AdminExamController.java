package com.examease.backend.controller;

import com.examease.backend.model.Exam;
import com.examease.backend.service.ExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/exams")
@CrossOrigin
public class AdminExamController {
    private final ExamService examService;

    public AdminExamController(ExamService examService) { this.examService = examService; }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Exam> create(@RequestBody Exam exam) {
        Exam saved = examService.save(exam);
        return ResponseEntity.ok(saved);
    }
}

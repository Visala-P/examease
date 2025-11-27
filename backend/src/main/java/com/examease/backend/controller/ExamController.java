package com.examease.backend.controller;

import com.examease.backend.model.Exam;
import com.examease.backend.service.ExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin
public class ExamController {
    private final ExamService examService;

    public ExamController(ExamService examService) { this.examService = examService; }

    @GetMapping
    public List<Exam> listAll() { return examService.listAll(); }

    @GetMapping("/published")
    public List<Exam> listPublished() { return examService.listPublished(); }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return examService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

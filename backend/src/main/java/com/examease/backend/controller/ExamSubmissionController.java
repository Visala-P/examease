package com.examease.backend.controller;

import com.examease.backend.dto.SubmitExamDto;
import com.examease.backend.model.Attempt;
import com.examease.backend.model.Answer;
import com.examease.backend.model.Question;
import com.examease.backend.service.AttemptService;
import com.examease.backend.service.ExamService;
import com.examease.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin
public class ExamSubmissionController {
    private final AttemptService attemptService;
    private final UserService userService;
    private final ExamService examService;

    public ExamSubmissionController(AttemptService attemptService, UserService userService, ExamService examService) {
        this.attemptService = attemptService;
        this.userService = userService;
        this.examService = examService;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@RequestBody SubmitExamDto dto) {
        var su = userService.findById(dto.getStudentId());
        var ex = examService.findById(dto.getExamId());
        if (su.isEmpty() || ex.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error","invalid ids"));
        Attempt a = attemptService.startAttempt(su.get(), ex.get());
        List<Answer> answers = new ArrayList<>();
        if (dto.getAnswers() != null) {
            dto.getAnswers().forEach(ad -> {
                Answer ans = new Answer();
                Question q = new Question(); q.setId(ad.getQuestionId());
                ans.setQuestion(q);
                ans.setSelectedOptionId(ad.getSelectedOptionId());
                answers.add(ans);
            });
        }
        Attempt result = attemptService.submitAttempt(a.getId(), answers);
        return ResponseEntity.ok(result);
    }
}

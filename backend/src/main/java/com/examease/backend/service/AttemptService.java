package com.examease.backend.service;

import com.examease.backend.model.*;
import com.examease.backend.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AttemptService {
    private final AttemptRepository attemptRepository;
    private final AnswerRepository answerRepository;
    private final OptionRepository optionRepository;
    private final QuestionRepository questionRepository;

    public AttemptService(AttemptRepository attemptRepository, AnswerRepository answerRepository, OptionRepository optionRepository, QuestionRepository questionRepository) {
        this.attemptRepository = attemptRepository;
        this.answerRepository = answerRepository;
        this.optionRepository = optionRepository;
        this.questionRepository = questionRepository;
    }

    public Attempt startAttempt(User student, Exam exam) {
        Attempt a = new Attempt();
        a.setStudent(student);
        a.setExam(exam);
        a.setStartedAt(LocalDateTime.now());
        a.setScore(0.0);
        return attemptRepository.save(a);
    }

    public Attempt submitAttempt(Long attemptId, List<Answer> answers) {
        Attempt attempt = attemptRepository.findById(attemptId).orElseThrow();
        double total = 0.0;
        List<Answer> persisted = new ArrayList<>();
        for (Answer a : answers) {
            a.setAttempt(attempt);
            Question q = questionRepository.findById(a.getQuestion().getId()).orElseThrow();
            a.setQuestion(q);
            answerRepository.save(a);
            persisted.add(a);

            // check correctness
            if (a.getSelectedOptionId() != null) {
                var opt = optionRepository.findById(a.getSelectedOptionId());
                if (opt.isPresent() && opt.get().isCorrect()) {
                    total += q.getPoints();
                }
            }
        }
        attempt.setAnswers(persisted);
        attempt.setSubmittedAt(LocalDateTime.now());
        attempt.setScore(total);
        return attemptRepository.save(attempt);
    }

    public List<Attempt> listByStudent(Long studentId) { return attemptRepository.findByStudentId(studentId); }
    public List<Attempt> listByExam(Long examId) { return attemptRepository.findByExamId(examId); }
}

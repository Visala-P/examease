package com.examease.backend.service;

import com.examease.backend.model.Exam;
import com.examease.backend.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {
    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public Exam save(Exam exam) { return examRepository.save(exam); }
    public List<Exam> listAll() { return examRepository.findAll(); }
    public List<Exam> listPublished() { return examRepository.findByPublishedTrue(); }
    public java.util.Optional<Exam> findById(Long id) { return examRepository.findById(id); }
    public void delete(Long id) { examRepository.deleteById(id); }
}

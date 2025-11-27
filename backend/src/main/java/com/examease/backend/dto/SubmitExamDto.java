package com.examease.backend.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;

public class SubmitExamDto {
    @NotNull
    private Long examId;
    private Long studentId;

    private List<AnswerDto> answers;

    public SubmitExamDto() {}
    public Long getExamId() { return examId; }
    public void setExamId(Long examId) { this.examId = examId; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public List<AnswerDto> getAnswers() { return answers; }
    public void setAnswers(List<AnswerDto> answers) { this.answers = answers; }
}

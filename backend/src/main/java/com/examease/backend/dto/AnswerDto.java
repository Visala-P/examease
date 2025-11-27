package com.examease.backend.dto;

public class AnswerDto {
    private Long questionId;
    private Long selectedOptionId;

    public AnswerDto() {}
    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }
    public Long getSelectedOptionId() { return selectedOptionId; }
    public void setSelectedOptionId(Long selectedOptionId) { this.selectedOptionId = selectedOptionId; }
}

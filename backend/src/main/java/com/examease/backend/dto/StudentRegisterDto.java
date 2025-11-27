package com.examease.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class StudentRegisterDto {
    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public StudentRegisterDto() {}
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getFullName() { return name; }
    public void setFullName(String fullName) { this.name = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

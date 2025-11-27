package com.examease.backend.service;

import com.examease.backend.model.Role;
import com.examease.backend.model.User;
import com.examease.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerStudent(String name, String email, String rawPassword) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode(rawPassword));
        u.setRole(Role.ROLE_STUDENT);
        return userRepository.save(u);
    }

    public Optional<User> findByEmail(String email) { return userRepository.findByEmail(email); }

    public Optional<User> findById(Long id) { return userRepository.findById(id); }

    public boolean checkPassword(String rawPassword, String encoded) {
        return passwordEncoder.matches(rawPassword, encoded);
    }

    public String encodePassword(String raw) { return passwordEncoder.encode(raw); }

    public User save(User u) { return userRepository.save(u); }
}

package com.examease.backend.config;

import com.examease.backend.model.Role;
import com.examease.backend.model.User;
import com.examease.backend.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile("!test")
public class DataLoader implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        try {
            String adminEmail = "admin@examease.com";
            String adminPassword = System.getenv("ADMIN_PASSWORD");
            if (adminPassword == null || adminPassword.isBlank()) adminPassword = "admin123";

            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User();
                admin.setName("admin");
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                admin.setRole(Role.ROLE_ADMIN);
                User savedAdmin = userRepository.save(admin);
                System.out.println("✓ Created default admin user: " + adminEmail + " with ID: " + savedAdmin.getId());
            } else {
                User existingAdmin = userRepository.findByEmail(adminEmail).get();
                System.out.println("✓ Admin user already exists: " + adminEmail + " with ID: " + existingAdmin.getId());
            }
        } catch (Exception e) {
            System.err.println("✗ Failed to create admin user: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}

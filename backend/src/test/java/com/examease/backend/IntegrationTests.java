package com.examease.backend;

import com.examease.backend.dto.LoginDto;
import com.examease.backend.dto.StudentRegisterDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class IntegrationTests {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate rest;

    @Test
    void registerAndLoginStudent() {
        String base = "http://localhost:" + port + "/api/student";

        StudentRegisterDto dto = new StudentRegisterDto();
        dto.setFullName("Test Student");
        dto.setEmail("teststudent@example.com");
        dto.setPassword("password123");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<StudentRegisterDto> regReq = new HttpEntity<>(dto, headers);

        ResponseEntity<String> regRes = rest.postForEntity(base + "/register", regReq, String.class);
        assertThat(regRes.getStatusCode()).isIn(HttpStatus.OK, HttpStatus.BAD_REQUEST);

        LoginDto login = new LoginDto();
        login.setEmail("teststudent@example.com");
        login.setPassword("password123");

        HttpEntity<LoginDto> loginReq = new HttpEntity<>(login, headers);
        ResponseEntity<String> loginRes = rest.postForEntity(base + "/login", loginReq, String.class);
        assertThat(loginRes.getStatusCode()).isIn(HttpStatus.OK, HttpStatus.UNAUTHORIZED);
    }
}

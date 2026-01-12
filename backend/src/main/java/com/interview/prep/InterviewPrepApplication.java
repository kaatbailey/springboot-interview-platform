package com.interview.prep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InterviewPrepApplication {

    public static void main(String[] args) {
        SpringApplication.run(InterviewPrepApplication.class, args);
        System.out.println("🚀 Interview Prep Backend is running on http://localhost:8080");
    }
}
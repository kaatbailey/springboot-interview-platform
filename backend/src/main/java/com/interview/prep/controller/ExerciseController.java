package com.interview.prep.controller;

import com.interview.prep.dto.request.CodeSubmissionRequest;
import com.interview.prep.dto.response.ExerciseResponse;
import com.interview.prep.dto.response.TestResultResponse;
import com.interview.prep.service.CodeVerificationService;
import com.interview.prep.service.ExerciseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;
    private final CodeVerificationService codeVerificationService;

    @GetMapping
    public ResponseEntity<List<ExerciseResponse>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseResponse> getExerciseById(@PathVariable Long id) {
        return ResponseEntity.ok(exerciseService.getExerciseById(id));
    }

    @PostMapping("/submit")
    public ResponseEntity<TestResultResponse> submitCode(@Valid @RequestBody CodeSubmissionRequest request) {
        return ResponseEntity.ok(codeVerificationService.submitCode(request));
    }
}

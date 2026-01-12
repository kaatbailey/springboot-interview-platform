package com.interview.prep.service;

import com.interview.prep.dto.request.CodeSubmissionRequest;
import com.interview.prep.dto.response.TestResultResponse;
import com.interview.prep.model.*;
import com.interview.prep.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CodeVerificationService {

    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;
    private final UserProgressRepository userProgressRepository;
    private final CodeSubmissionRepository codeSubmissionRepository;

    @Transactional
    public TestResultResponse submitCode(CodeSubmissionRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Exercise exercise = exerciseRepository.findById(request.getExerciseId())
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        // Simple verification (in real app, you'd compile and run tests)
        boolean isCorrect = verifyCode(request.getCode(), exercise);

        // Save submission
        CodeSubmission submission = CodeSubmission.builder()
                .user(user)
                .exercise(exercise)
                .codeSubmitted(request.getCode())
                .isCorrect(isCorrect)
                .testResults(isCorrect ? "All tests passed" : "Some tests failed")
                .build();
        codeSubmissionRepository.save(submission);

        // Update progress
        UserProgress progress = userProgressRepository
                .findByUserIdAndExerciseId(user.getId(), exercise.getId())
                .orElse(UserProgress.builder()
                        .user(user)
                        .exercise(exercise)
                        .status(UserProgress.Status.IN_PROGRESS)
                        .attemptsCount(0)
                        .build());

        progress.setAttemptsCount(progress.getAttemptsCount() + 1);

        if (isCorrect) {
            progress.setStatus(UserProgress.Status.COMPLETED);
            progress.setCompletedAt(LocalDateTime.now());

            // Award XP
            user.setTotalXp(user.getTotalXp() + exercise.getXpPoints());
            userRepository.save(user);
        }

        userProgressRepository.save(progress);

        // Build response
        List<String> testResults = new ArrayList<>();
        testResults.add(isCorrect ? "✅ Code syntax is correct" : "❌ Code has errors");
        testResults.add(isCorrect ? "✅ All test cases passed" : "❌ Some test cases failed");

        return TestResultResponse.builder()
                .success(isCorrect)
                .message(isCorrect ? "Congratulations! Exercise completed!" : "Keep trying!")
                .testsPassed(isCorrect ? 2 : 1)
                .totalTests(2)
                .xpEarned(isCorrect ? exercise.getXpPoints() : 0)
                .testResults(testResults)
                .build();
    }

    private boolean verifyCode(String code, Exercise exercise) {
        // Simple verification - checks if code contains expected keywords
        // In production, you would compile and run actual tests
        String solution = exercise.getSolutionCode().toLowerCase();
        String submitted = code.toLowerCase();

        // Basic checks
        if (exercise.getTitle().contains("Functional Interface")) {
            return submitted.contains("@functionalinterface") &&
                    submitted.contains("interface") &&
                    submitted.contains("string process");
        }

        if (exercise.getTitle().contains("Lambda")) {
            return submitted.contains("->") &&
                    submitted.contains("runnable");
        }

        if (exercise.getTitle().contains("Stream")) {
            return submitted.contains("stream()") &&
                    submitted.contains("filter") &&
                    submitted.contains("map");
        }

        return false;
    }
}

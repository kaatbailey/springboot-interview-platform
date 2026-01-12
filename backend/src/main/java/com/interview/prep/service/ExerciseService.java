package com.interview.prep.service;

import com.interview.prep.dto.response.ExerciseResponse;
import com.interview.prep.model.Exercise;
import com.interview.prep.model.User;
import com.interview.prep.model.UserProgress;
import com.interview.prep.repository.ExerciseRepository;
import com.interview.prep.repository.UserProgressRepository;
import com.interview.prep.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;
    private final UserProgressRepository userProgressRepository;

    @Transactional(readOnly = true)
    public List<ExerciseResponse> getAllExercises() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElse(null);

        List<Exercise> exercises = exerciseRepository.findAllByOrderByOrderIndexAsc();

        return exercises.stream()
                .map(exercise -> mapToResponse(exercise, user))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ExerciseResponse getExerciseById(Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElse(null);

        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        return mapToResponse(exercise, user);
    }

    private ExerciseResponse mapToResponse(Exercise exercise, User user) {
        ExerciseResponse.ExerciseResponseBuilder builder = ExerciseResponse.builder()
                .id(exercise.getId())
                .title(exercise.getTitle())
                .description(exercise.getDescription())
                .theoryContent(exercise.getTheoryContent())
                .difficulty(exercise.getDifficulty().name())
                .xpPoints(exercise.getXpPoints())
                .orderIndex(exercise.getOrderIndex())
                .starterCode(exercise.getStarterCode())
                .userProgress("NOT_STARTED")
                .attemptsCount(0);

        if (user != null) {
            userProgressRepository.findByUserIdAndExerciseId(user.getId(), exercise.getId())
                    .ifPresent(progress -> {
                        builder.userProgress(progress.getStatus().name());
                        builder.attemptsCount(progress.getAttemptsCount());
                    });
        }

        return builder.build();
    }
}

package com.interview.prep.repository;

import com.interview.prep.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {

    Optional<UserProgress> findByUserIdAndExerciseId(Long userId, Long exerciseId);

    List<UserProgress> findByUserId(Long userId);

    List<UserProgress> findByUserIdAndStatus(Long userId, UserProgress.Status status);

    Long countByUserIdAndStatus(Long userId, UserProgress.Status status);
}
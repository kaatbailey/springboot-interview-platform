package com.interview.prep.repository;

import com.interview.prep.model.CodeSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeSubmissionRepository extends JpaRepository<CodeSubmission, Long> {

    List<CodeSubmission> findByUserIdAndExerciseId(Long userId, Long exerciseId);

    List<CodeSubmission> findByUserIdOrderBySubmittedAtDesc(Long userId);
}
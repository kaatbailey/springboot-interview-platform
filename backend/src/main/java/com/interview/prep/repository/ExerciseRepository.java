package com.interview.prep.repository;

import com.interview.prep.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    List<Exercise> findAllByOrderByOrderIndexAsc();

    List<Exercise> findByDifficulty(Exercise.Difficulty difficulty);
}
package com.interview.prep.dto.response;

import com.interview.prep.model.Exercise;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseResponse {
    private Long id;
    private String title;
    private String description;
    private String theoryContent;
    private String difficulty;
    private Integer xpPoints;
    private Integer orderIndex;
    private String starterCode;
    private String userProgress;
    private Integer attemptsCount;
}
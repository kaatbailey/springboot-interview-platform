package com.interview.prep.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestResultResponse {
    private Boolean success;
    private String message;
    private Integer testsPassed;
    private Integer totalTests;
    private Integer xpEarned;
    private List<String> testResults;
}

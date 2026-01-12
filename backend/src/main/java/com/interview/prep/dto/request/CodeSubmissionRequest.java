package com.interview.prep.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CodeSubmissionRequest {

    @NotNull(message = "Exercise ID is required")
    private Long exerciseId;

    @NotBlank(message = "Code is required")
    private String code;
}

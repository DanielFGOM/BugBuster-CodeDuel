package com.bugbuster.dto;

import lombok.Data;

@Data
public class SubmitRequest {
    private Long levelId;
    private String code;
}
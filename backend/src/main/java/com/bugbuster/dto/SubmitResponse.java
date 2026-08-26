package com.bugbuster.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class SubmitResponse {
    private boolean success;
    private String message;
    private String output;
}
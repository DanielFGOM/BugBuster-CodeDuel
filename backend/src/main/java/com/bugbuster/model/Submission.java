package com.bugbuster.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Submission {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Level level;
    @Column(length = 5000)
    private String code;
    private boolean passed;
    private String output;
    private LocalDateTime submittedAt = LocalDateTime.now();
}
package com.bugbuster.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Level {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @Column(length = 2000)
    private String template; // código base con marcador //USER_CODE
    @Column(length = 2000)
    private String testCode; // código para probar la solución
    private String expectedOutput;
    private String hint;
    private int orderNumber;
}
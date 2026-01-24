package com.auth.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "students")
public class Student {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @OneToOne
    @JoinColumn(name = "id")
    private User user;

    @Column(unique = true)
    private String rollNumber;

    private String department;
    private String className;
}

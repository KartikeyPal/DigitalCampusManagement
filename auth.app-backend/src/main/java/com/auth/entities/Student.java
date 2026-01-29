package com.auth.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "students")
public class Student {

    @Id
    @Column(name = "student_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "id")
    private User user;

    @Column(unique = true, nullable = false)
    private String rollNumber;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
    private String className;
}

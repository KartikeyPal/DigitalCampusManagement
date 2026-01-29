package com.auth.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "department_id")
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;
}

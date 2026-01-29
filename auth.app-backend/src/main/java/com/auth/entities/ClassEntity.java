package com.auth.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "classes")
public class ClassEntity {

    @Id
    @GeneratedValue
    @Column(name = "class_id")
    private UUID id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @OneToOne
    @JoinColumn(name = "user_id")
    public User classTeacher;
}

package com.auth.repositories;

import com.auth.dtos.ClassDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClassRepository extends JpaRepository<ClassDto, UUID> {
}

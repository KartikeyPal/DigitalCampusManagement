package com.auth.controllers;

import com.auth.entities.Subject;
import com.auth.repositories.ClassRepository;
import com.auth.repositories.FacultyRepository;
import com.auth.repositories.SubjectRepository;
import com.auth.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
//For testing puropose only Still work is needed
@RestController
@RequestMapping("/test/subjects")
public class SubjectController {

    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final SubjectRepository subjectRepository;

    public SubjectController(UserRepository userRepository, ClassRepository classRepository, SubjectRepository subjectRepository, FacultyRepository facultyRepository){
        this.classRepository = classRepository;
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/{classId}/{facultyId}")
    public Subject create(@PathVariable UUID classId, @PathVariable UUID facultyId, @RequestBody Subject subject){
        subject.setClassEntity(classRepository.findById(classId).orElseThrow());
        subject.setFaculty(userRepository.findById(facultyId).orElseThrow());
        return subjectRepository.save(subject);
    }


}

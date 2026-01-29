package com.auth.services.impl;

import com.auth.dtos.SubjectDto;
import com.auth.entities.ClassEntity;
import com.auth.entities.Subject;
import com.auth.entities.User;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.repositories.ClassRepository;
import com.auth.repositories.SubjectRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;


@Override
    public SubjectDto create(SubjectDto dto) {

        ClassEntity classEntity = classRepository.findById(dto.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class not found"));

        User faculty = userRepository.findById(dto.getFacultyId())
                .orElseThrow(() -> new ResourceNotFoundException("Faculty not found"));

        Subject subject = new Subject();
        subject.setName(dto.getName());
        subject.setClassEntity(classEntity);
        subject.setFaculty(faculty);

        return mapper.map(subjectRepository.save(subject), SubjectDto.class);
    }

    @Override
    public List<SubjectDto> getAll() {
        return subjectRepository.findAll()
                .stream()
                .map(s -> mapper.map(s, SubjectDto.class))
                .toList();
    }
}


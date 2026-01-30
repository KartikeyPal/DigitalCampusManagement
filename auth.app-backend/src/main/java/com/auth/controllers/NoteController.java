package com.auth.controllers;

import com.auth.entities.Note;
import com.auth.services.impl.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    
    // UPLOAD NOTE (TEACHER ONLY)
    
    @PreAuthorize("hasRole('FACULTY')")
    @PostMapping("/upload")
    public ResponseEntity<Note> uploadNote(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
        ) throws IOException {

        String username = authentication.getName();
        return ResponseEntity.ok(
                noteService.uploadNote(file, username)
        );
    }

    
    // GET ALL NOTES (STUDENT + TEACHER)
    
    @GetMapping
    @PreAuthorize("hasAnyRole('FACULTY','STUDENT')")
    public ResponseEntity<List<Note>> getAllNotes() {
        return ResponseEntity.ok(
                noteService.getAllNotes()
        );
    }

    
    // DELETE NOTE (TEACHER ONLY)
    
    @PreAuthorize("hasRole('FACULTY')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable UUID id) {
        noteService.deleteNote(id);
        return ResponseEntity.ok("Note deleted successfully");
    }
}

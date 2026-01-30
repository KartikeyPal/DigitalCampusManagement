package com.auth.services.impl;

import com.auth.entities.Note;
import com.auth.repositories.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class NoteService {

    private final CloudinaryService cloudinaryService;
    private final NoteRepository noteRepository;

    public NoteService(CloudinaryService cloudinaryService,
                       NoteRepository noteRepository) {
        this.cloudinaryService = cloudinaryService;
        this.noteRepository = noteRepository;
    }

    // =========================
    // UPLOAD NOTE
    // =========================
    public Note uploadNote(MultipartFile file, String username) throws IOException {

        Map<String, Object> uploadResult =
                cloudinaryService.uploadFile(file);

        Note note = Note.builder()
                .fileName(file.getOriginalFilename())
                .fileUrl(uploadResult.get("secure_url").toString())
                .publicId(uploadResult.get("public_id").toString())
                .uploadedBy(username)
                .build();

        return noteRepository.save(note);
    }

    // =========================
    // GET ALL NOTES
    // =========================
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    // =========================
    // DELETE NOTE
    // =========================
    public void deleteNote(UUID id) {

        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        cloudinaryService.deleteFile(note.getPublicId());
        noteRepository.delete(note);
    }
}

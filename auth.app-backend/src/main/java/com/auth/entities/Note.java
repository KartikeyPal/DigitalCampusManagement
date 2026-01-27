package com.auth.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "note_id")
    private UUID id;

    private String fileName;

    @Column(length = 1000)
    private String fileUrl;

    private String publicId; // cloudinary public_id

    private String uploadedBy; // username (teacher)

}

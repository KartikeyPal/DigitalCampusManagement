package com.auth.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Column(length = 1000)
    private String fileUrl;

    private String publicId; // cloudinary public_id

    private String uploadedBy; // username (teacher)

}

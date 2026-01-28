package com.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateNotificationRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String message;

//    private String targetType; // USER, ROLE, CLASS...
//    private UUID targetId;

}


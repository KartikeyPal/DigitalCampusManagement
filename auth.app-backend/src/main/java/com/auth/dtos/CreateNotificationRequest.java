package com.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateNotificationRequest {

    private String title;
    private String message;

    private String targetType; // USER, ROLE, CLASS...
    private Long targetId;

}


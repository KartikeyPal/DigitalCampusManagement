package com.auth.dtos;

//import com.auth.entities.TargetROLE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponseDto {

    private UUID id;
    private String title;
    private String message;
    private LocalDateTime createdAt;
    private String targetRole;

}

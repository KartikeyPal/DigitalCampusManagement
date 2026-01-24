package com.auth.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;
//This is Composite key
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleId implements Serializable {
    @Column(name= "user_id")
    private UUID userId;

    @Column(name = "role_id")
    private UUID roleId;
}

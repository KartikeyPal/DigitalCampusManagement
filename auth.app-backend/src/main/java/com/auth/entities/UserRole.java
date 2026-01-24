package com.auth.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_roles")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRole {

    @EmbeddedId
    private UserRoleId id;

    @ManyToOne
    @MapsId("userId") // maps to UserRoleId.userId
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("roleId") // maps to UserRoleId.roleId
    @JoinColumn(name = "role_id")
    private Role role;
}


package com.auth.repositories;

import com.auth.entities.Role;
import com.auth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("""
    SELECT DISTINCT u
    FROM User u
    JOIN u.roles r
    WHERE r.name IN :roleNames
""")
    List<User> findUsersByRoleNames(List<String> roleNames);

}

package com.auth.seeder;

import com.auth.entities.Role;
import com.auth.entities.User;
import com.auth.repositories.RoleRepository;
import com.auth.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.name}")
    private String adminName;

    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) {

        // 1️⃣ Create ADMIN role if not exists
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(
                        Role.builder()
                                .name("ROLE_ADMIN")
                                .build()
                ));

        // 2️⃣ Create admin user if not exists
        if (userRepository.findByEmail(adminEmail).isEmpty()) {

            User admin = User.builder()
                    .email(adminEmail)
                    .name(adminName)
                    .password(passwordEncoder.encode(adminPassword))
                    .enable(true)
                    .roles(Set.of(adminRole))
                    .build();

            userRepository.save(admin);

            System.out.println("✅ ADMIN user created");
        } else {
            System.out.println("ℹ️ ADMIN user already exists");
        }
    }
}

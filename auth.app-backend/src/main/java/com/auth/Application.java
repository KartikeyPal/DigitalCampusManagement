package com.auth;

import com.auth.config.AppConstants;
import com.auth.entities.Role;
import com.auth.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.UUID;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {

		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		//will create some default user role

		roleRepository.findByName("ROLE_"+ AppConstants.ADMIN_ROLE).ifPresentOrElse(role ->{
			System.out.println("Admin Role Already exists: "+role.getName());
		},() ->{
			Role role = new Role();
			role.setName("ROLE_"+AppConstants.ADMIN_ROLE);
			role.setId(UUID.randomUUID());
			roleRepository.save(role);
		});

		roleRepository.findByName("ROLE_"+ AppConstants.STUDENT_ROLE).ifPresentOrElse(role ->{
			System.out.println("Student Role Already exists: "+role.getName());
		},() ->{
			Role role = new Role();
			role.setName("ROLE_"+AppConstants.STUDENT_ROLE);
			role.setId(UUID.randomUUID());
			roleRepository.save(role);
		});

		roleRepository.findByName("ROLE_"+ AppConstants.FACULTY_ROLE).ifPresentOrElse(role ->{
			System.out.println("Faculty Role Already exists: "+role.getName());
		},() ->{
			Role role = new Role();
			role.setName("ROLE_"+AppConstants.FACULTY_ROLE);
			role.setId(UUID.randomUUID());
			roleRepository.save(role);
		});

		roleRepository.findByName("ROLE_"+ AppConstants.HOD_ROLE).ifPresentOrElse(role ->{
			System.out.println("HOD Role Already exists: "+role.getName());
		},() ->{
			Role role = new Role();
			role.setName("ROLE_"+AppConstants.HOD_ROLE);
			role.setId(UUID.randomUUID());
			roleRepository.save(role);
		});
	}
}

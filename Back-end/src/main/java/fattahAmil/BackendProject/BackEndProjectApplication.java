package fattahAmil.BackendProject;

import fattahAmil.BackendProject.Entity.Role;
import fattahAmil.BackendProject.Entity.User;
import fattahAmil.BackendProject.Service.Implement.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;


@SpringBootApplication
@EnableWebSecurity
@EnableJpaRepositories
public class BackEndProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndProjectApplication.class, args);
	}
	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder(){
		return new BCryptPasswordEncoder();
	}
	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveRole(new Role(1, "ROLE_STUDENT", "this is Student"));
			userService.saveRole(new Role(2, "ROLE_TEACHER", "this is Teacher"));
			userService.saveRole(new Role(3, "ROLE_ADMIN", "this is Admin"));

			userService.saveUser(new User("fattah","amil","Fattah12","fattah@ibm.com",new HashSet<>()));
			userService.saveUser(new User("fahd","fahd","Fahd1234","fahd@ibm.com",new HashSet<>()));
			userService.saveUser(new User("hamid","hamid","Hamid123","hamid@ibm.com",new HashSet<>()));


			userService.addToUser("fattah@ibm.com","ROLE_ADMIN");
			userService.addToUser("fahd@ibm.com","ROLE_TEACHER");
			userService.addToUser("hamid@ibm.com","ROLE_STUDENT");
		};
	}
}

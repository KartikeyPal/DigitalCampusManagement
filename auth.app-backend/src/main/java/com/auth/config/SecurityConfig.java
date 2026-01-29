package com.auth.config;

import com.auth.dtos.ApiError;
import com.auth.security.JwtAuthenticationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private AuthenticationSuccessHandler successHandler;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, AuthenticationSuccessHandler successHandler) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.successHandler = successHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        //we disable the csrf for access the post, put, delete mapping and important only when we directly use the backend application
        //not important csrf , if we use frontend and backend application separately
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizedHttpRequests ->
                        authorizedHttpRequests
                                .requestMatchers("/api/auth/register").permitAll()       //give the permission so that api works without the security
                                .requestMatchers("/api/auth/login").permitAll()
                                .requestMatchers("/api/auth/refresh").permitAll()
                                .requestMatchers("/api/auth/oauth2/**").permitAll()
                               // .requestMatchers("/api/auth/logout").permitAll()
                                .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 ->
                        oauth2.successHandler(successHandler)                         //login with goggle successfully
                                .failureHandler(null)       //if failure then it will be runs
                )
                .logout(AbstractHttpConfigurer::disable)
                .exceptionHandling(ex -> ex.authenticationEntryPoint(
                        (request, response, e) -> {
                            //error message
                            //e.printStackTrace();
                            response.setStatus(401);
                            response.setContentType("application/json");
                            String message = "Unauthorized Access! " + e.getMessage();
                            String error = (String)request.getAttribute("error");

                            if(error != null){
                                message = error;
                            }

                           // Map<String, String> errorMap = Map.of("message",message, "statusCode",Integer.toString(401));
                            var apiError = ApiError.of(HttpStatus.UNAUTHORIZED.value(), "Unauthorized Access", message, request.getRequestURI(), true);
                            var objectMapper = new ObjectMapper();        //converts the map object to the json format
                            response.getWriter().write(objectMapper.writeValueAsString(apiError));
                })
                        .accessDeniedHandler((request, response, e) -> {

                            response.setStatus(403);
                            response.setContentType("application/json");
                            String message = e.getMessage();
                            String error = (String) request.getAttribute("error");
                            if (error != null) {
                                message = error;
                            }
                            var apiError = ApiError.of(HttpStatus.FORBIDDEN.value(), "Forbidden Access", message, request.getRequestURI(), true);
                            var objectMapper = new ObjectMapper();
                            response.getWriter().write(objectMapper.writeValueAsString(apiError));

                        }))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                //.httpBasic(Customizer.withDefaults());          //enables the basic authentication(tested in postman) , not the form based

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
//    @Bean
//    public UserDetailsService users(){
//        User.UserBuilder userBuilder = User.withDefaultPasswordEncoder();
//        UserDetails user1 = userBuilder.username("Hello").password("123").roles("ADMIN").build();
//        UserDetails user2 = userBuilder.username("Hi").password("123").roles("ADMIN").build();
//
//        return new InMemoryUserDetailsManager(user1, user2);
//    }
}

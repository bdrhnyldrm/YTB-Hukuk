package com.ytb.lawfirm.config;

import com.ytb.lawfirm.user.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/actuator/**",
                                "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html",
                                "/api/articles/**",
                                "/api/contact/**",      // ✅ yeterli
                                "/api/career/**",       // ✅ yeterli
                                "/files/**"
                        ).permitAll()
                        .requestMatchers("/api/admin/**").hasRole(Role.LAWYER.name())
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://ytb-lawfirm.com"
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService users(PasswordEncoder enc) {
        UserDetails ali = User.withUsername("ali")
                .password("$2a$10$SscXggF15GTzNpfNmqcNNOOJJzpf2a2LS6u5eWnYavQqiUYrB9Vjy")
                .roles(Role.LAWYER.name())
                .build();

        UserDetails sukur = User.withUsername("sukur")
                .password("$2a$10$66P97Jqks9uAmyFOjmsn7OMobCtNIWJi4rmGPRr7hEiEELOZkoj.O")
                .roles(Role.LAWYER.name())
                .build();

        UserDetails cagatay = User.withUsername("cagatay")
                .password("$2a$10$fyooCvolvFblFbbZaCIge.n.8rkfhCNA6ZG68sUSxOYP83NrK.LYC")
                .roles(Role.LAWYER.name())
                .build();

        return new InMemoryUserDetailsManager(ali, sukur, cagatay);
    }
}

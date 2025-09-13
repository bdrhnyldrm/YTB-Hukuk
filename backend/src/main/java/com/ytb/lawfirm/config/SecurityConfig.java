package com.ytb.lawfirm.config;

import com.ytb.lawfirm.user.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;


@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/actuator/**",
                                "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html",
                                "/api/articles/**",    // makale listesi & detay herkese açık
                                "/api/contact/**",     // iletişim formu
                                "/api/career/**"       // kariyer formu
                        ).permitAll()
                        .requestMatchers("/api/admin/**").hasRole(Role.LAWYER.name()) // sadece LAWYER
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults()); // basit auth (MVP için)

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // MVP: 3 avukatı memory’de tutuyoruz
    @Bean
    public UserDetailsService users(PasswordEncoder enc) {
        UserDetails ali = User.withUsername("ali")
                .password(enc.encode("ali123"))
                .roles(Role.LAWYER.name())
                .build();

        UserDetails sukur = User.withUsername("sukur")
                .password(enc.encode("sukur123"))
                .roles(Role.LAWYER.name())
                .build();

        UserDetails cagatay = User.withUsername("cagatay")
                .password(enc.encode("cagatay123"))
                .roles(Role.LAWYER.name())
                .build();

        return new InMemoryUserDetailsManager(ali, sukur, cagatay);
    }
}

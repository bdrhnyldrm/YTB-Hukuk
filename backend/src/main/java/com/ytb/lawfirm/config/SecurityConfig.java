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
                                "/api/career/**",      // kariyer formu
                                "/files/**"            // ✅ kapak fotoğrafları herkese açık
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

    // ✅ 3 avukatı memory’de tutuyoruz — düz şifre yok, hash kullanılıyor
    @Bean
    public UserDetailsService users(PasswordEncoder enc) {

        // KENDİ ÜRETTİĞİN HASH'LERİ BURAYA YERLEŞTİR
        UserDetails ali = User.withUsername("ali")
                .password("$2a$10$SscXggF15GTzNpfNmqcNNOOJJzpf2a2LS6u5eWnYavQqiUYrB9Vjy") // örnek hash
                .roles(Role.LAWYER.name())
                .build();

        UserDetails sukur = User.withUsername("sukur")
                .password("$2a$10$66P97Jqks9uAmyFOjmsn7OMobCtNIWJi4rmGPRr7hEiEELOZkoj.O") // kendi hash’inle değiştir
                .roles(Role.LAWYER.name())
                .build();

        UserDetails cagatay = User.withUsername("cagatay")
                .password("$2a$10$fyooCvolvFblFbbZaCIge.n.8rkfhCNA6ZG68sUSxOYP83NrK.LYC") // kendi hash’inle değiştir
                .roles(Role.LAWYER.name())
                .build();

        return new InMemoryUserDetailsManager(ali, sukur, cagatay);
    }
}

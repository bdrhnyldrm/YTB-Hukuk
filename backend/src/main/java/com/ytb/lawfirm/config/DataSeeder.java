package com.ytb.lawfirm.config;

import com.ytb.lawfirm.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration @RequiredArgsConstructor
public class DataSeeder {

    @Bean
    CommandLineRunner seedUsers(UserRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                repo.save(User.builder().username("ali").fullName("Av. Ali İhsan Yıldırım").password("N/A").role(Role.LAWYER).build());
                repo.save(User.builder().username("sukur").fullName("Av. Şükür Temel").password("N/A").role(Role.LAWYER).build());
                repo.save(User.builder().username("cagatay").fullName("Av. Çağatay Kaan Bozoğlu").password("N/A").role(Role.LAWYER).build());
            }
        };
    }
}

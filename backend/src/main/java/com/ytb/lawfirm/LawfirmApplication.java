package com.ytb.lawfirm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class LawfirmApplication {

	public static void main(String[] args) {

		ConfigurableApplicationContext context = SpringApplication.run(LawfirmApplication.class, args);

		Environment env = context.getEnvironment();

		System.out.println("🚀 YTB Hukuk uygulaması başarıyla başlatıldı!");
		System.out.println("🌍 Aktif port: " + env.getProperty("server.port", "8080"));
		System.out.println("📧 SMTP kullanıcı: " + env.getProperty("spring.mail.username"));
	}
}

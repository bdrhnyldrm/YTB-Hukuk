package com.ytb.lawfirm.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class BCryptGenerator {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Kullanım: java BCryptGenerator <parola>");
            System.exit(1);
        }
        String raw = args[0];
        PasswordEncoder enc = new BCryptPasswordEncoder();
        String hash = enc.encode(raw);
        System.out.println("BCrypt hash:");
        System.out.println(hash);
    }
}

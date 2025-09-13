package com.ytb.lawfirm.user;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable=false)
    private String username; // giriş için (örn. ali, sukur, cagatay)

    @Column(nullable=false)
    private String fullName; // makalede gözükecek ad

    @Column(nullable=false)
    private String password; // BCrypt

    @Enumerated(EnumType.STRING)
    private Role role;
}

package com.ytb.lawfirm.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Ad Soyad zorunludur.")
    @Size(max = 100, message = "Ad Soyad en fazla 100 karakter olabilir.")
    private String name;

    @NotBlank(message = "E-posta zorunludur.")
    @Email(message = "Geçerli bir e-posta adresi giriniz.")
    @Size(max = 120, message = "E-posta en fazla 120 karakter olabilir.")
    private String email;

    @Size(max = 20, message = "Telefon en fazla 20 karakter olabilir.")
    private String phone;

    @NotBlank(message = "Mesaj alanı boş bırakılamaz.")
    @Size(max = 2000, message = "Mesaj en fazla 2000 karakter olabilir.")
    private String message;

    @NotNull(message = "KVKK onayı zorunludur.")
    private Boolean consent;

    // Getters & Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Boolean getConsent() { return consent; }
    public void setConsent(Boolean consent) { this.consent = consent; }
}

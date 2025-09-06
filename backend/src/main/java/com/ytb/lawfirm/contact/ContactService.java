package com.ytb.lawfirm.contact;

import com.ytb.lawfirm.email.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final EmailService emailService;

    // Alıcı adresi properties'ten okunur; verilmezse varsayılanı kullanır.
    private final String recipient;

    public ContactService(
            EmailService emailService,
            @Value("${app.contact.recipient:ytbhukuk@gmail.com}") String recipient
    ) {
        this.emailService = emailService;
        this.recipient = recipient;
    }

    public void handle(ContactRequest req) {
        // Güvenli alanlar
        final String name = nullToEmpty(req.getName());
        final String email = nullToEmpty(req.getEmail());
        final String phone = nullToEmpty(req.getPhone());
        final String message = nullToEmpty(req.getMessage());

        // Log (kişisel veri içerdiği için sadece uzunluk vb. hassas olmayan bilgiler loglanır)
        log.info("Contact received: name='{}', email='{}', phone='{}', messageLength={}",
                name, email, phone, message.length());

        // E-posta konusu ve içeriği
        final String subject = "YTB Hukuk | Yeni Randevunuz Var";
        final String body =
                "Yeni bir iletişim formu gönderildi:\n\n" +
                        "Ad Soyad : " + name + "\n" +
                        "E-posta  : " + email + "\n" +
                        "Telefon  : " + (phone.isBlank() ? "-" : phone) + "\n" +
                        "----------------------------------------\n" +
                        message + "\n";

        try {
            emailService.sendEmail(recipient, subject, body);
            log.info("Contact e-postası '{}' adresine gönderildi.", recipient);
        } catch (Exception ex) {
            log.error("Contact e-postası gönderilemedi: {}", ex.getMessage(), ex);
            // Controller 5xx dönebilsin diye üst katmana fırlatıyoruz
            throw new RuntimeException("E-posta gönderimi sırasında bir hata oluştu.");
        }
    }

    private static String nullToEmpty(String s) {
        return s == null ? "" : s.trim();
    }
}

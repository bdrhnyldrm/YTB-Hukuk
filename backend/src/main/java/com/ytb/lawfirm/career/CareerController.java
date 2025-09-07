package com.ytb.lawfirm.career;

import com.ytb.lawfirm.email.EmailService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/career")
@CrossOrigin(origins = "*")
public class CareerController {

    private final EmailService email;

    // başvuruların düşeceği adres
    private static final String TO = "ytbhukuk@gmail.com";

    public CareerController(EmailService email) {
        this.email = email;
    }

    // -------- STAJ BAŞVURUSU --------
    @PostMapping(path = "/internship", consumes = {"multipart/form-data"})
    public ResponseEntity<?> internship(
            @RequestPart("name") @NotBlank @Size(max = 100) String name,
            @RequestPart("email") @NotBlank @Email @Size(max = 120) String emailAddr,
            @RequestPart(value = "phone", required = false) @Size(max = 20) String phone,
            @RequestPart("university") @NotBlank @Size(max = 120) String university,
            @RequestPart(value = "linkedin", required = false) @Size(max = 200) String linkedin,
            @RequestPart(value = "note", required = false) @Size(max = 2000) String note,
            @RequestPart(value = "cv", required = false) MultipartFile cv
    ) {
        String subject = "Staj Başvurusu - " + name;
        String body = """
                Yeni staj başvurusu:

                Ad Soyad: %s
                E-posta: %s
                Telefon: %s
                Üniversite/Bölüm: %s
                LinkedIn: %s

                Not:
                %s
                """.formatted(name, emailAddr, empty(phone), university, empty(linkedin), empty(note));

        if (cv != null && !cv.isEmpty()) {
            sendWithCv(subject, body, cv);
        } else {
            email.sendEmail(TO, subject, body); // ✅ güncellendi
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(new Msg("Staj başvurunuz alınmıştır."));
    }

    // -------- İŞ BAŞVURUSU --------
    @PostMapping(path = "/job", consumes = {"multipart/form-data"})
    public ResponseEntity<?> job(
            @RequestPart("name") @NotBlank @Size(max = 100) String name,
            @RequestPart("email") @NotBlank @Email @Size(max = 120) String emailAddr,
            @RequestPart(value = "phone", required = false) @Size(max = 20) String phone,
            @RequestPart("position") @NotBlank @Size(max = 120) String position,
            @RequestPart(value = "linkedin", required = false) @Size(max = 200) String linkedin,
            @RequestPart(value = "coverLetter", required = false) @Size(max = 4000) String coverLetter,
            @RequestPart(value = "cv", required = false) MultipartFile cv
    ) {
        String subject = "İş Başvurusu - " + name + " (" + position + ")";
        String body = """
                Yeni iş başvurusu:

                Ad Soyad: %s
                E-posta: %s
                Telefon: %s
                Başvurulan Pozisyon: %s
                LinkedIn: %s

                Ön Yazı:
                %s
                """.formatted(name, emailAddr, empty(phone), position, empty(linkedin), empty(coverLetter));

        if (cv != null && !cv.isEmpty()) {
            sendWithCv(subject, body, cv);
        } else {
            email.sendEmail(TO, subject, body); // ✅ güncellendi
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(new Msg("İş başvurunuz alınmıştır."));
    }

    private void sendWithCv(String subject, String body, MultipartFile cv) {
        try {
            email.sendEmailWithAttachment(
                    TO,
                    subject,
                    body,
                    safeName(cv.getOriginalFilename()),
                    cv.getBytes(),
                    cv.getContentType() != null ? cv.getContentType() : "application/octet-stream"
            );
        } catch (Exception e) {
            throw new RuntimeException("CV eklenirken hata oluştu", e);
        }
    }

    private String empty(String v) { return v == null || v.isBlank() ? "-" : v; }
    private String safeName(String v) { return (v == null || v.isBlank()) ? "cv.pdf" : v; }

    record Msg(String message) {}
}

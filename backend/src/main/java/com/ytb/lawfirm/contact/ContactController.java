package com.ytb.lawfirm.contact;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") // frontend (React) ile entegrasyon için
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> submit(@Valid @RequestBody ContactRequest req) {
        // KVKK onayı yoksa 422 dön
        if (req.getConsent() == null || !req.getConsent()) {
            return ResponseEntity.unprocessableEntity()
                    .body(new ErrorResponse("KVKK onayı gerekli."));
        }

        // Mesajı işle (servis e-mail gönderir)
        service.handle(req);

        // Başarılı yanıt
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SuccessResponse("Mesajınız alınmıştır."));
    }

    // Response tipleri
    record SuccessResponse(String message) {}
    record ErrorResponse(String error) {}
}

package com.ytb.lawfirm.contact;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> submit(@Valid @RequestBody ContactRequest req) {
        if (!req.isConsent()) {
            return ResponseEntity.unprocessableEntity()
                    .body(new ErrorResponse("KVKK onayı gerekli."));
        }
        service.handle(req);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SuccessResponse("Mesajınız alınmıştır."));
    }

    record SuccessResponse(String message) {}
    record ErrorResponse(String error) {}
}

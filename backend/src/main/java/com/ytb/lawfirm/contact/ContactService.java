package com.ytb.lawfirm.contact;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    public void handle(ContactRequest req) {
        // 1) Şimdilik sadece logluyoruz
        log.info("Contact: name={}, email={}, phone={}, len(message)={}",
                req.getName(),
                req.getEmail(),
                req.getPhone(),
                req.getMessage() == null ? 0 : req.getMessage().length()
        );
    }
}

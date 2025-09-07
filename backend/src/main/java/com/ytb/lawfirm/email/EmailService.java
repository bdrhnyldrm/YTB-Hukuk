package com.ytb.lawfirm.email;

import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

/**
 * Basit düz metin e-posta ve ek(attachment) destekli e-posta gönderimi.
 * Mevcut iletişim formu akışı sendEmail(...) ile aynen çalışmaya devam eder.
 */
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /** Mevcut kullanım: düz metin mail (iletişim formu bunu çağırıyor olabilir) */
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        // from adresi application.properties'deki spring.mail.username üzerinden ayarlanır
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    /** HTML gövde ile mail (opsiyonel) */
    public void sendEmailHtml(String to, String subject, String htmlBody) {
        try {
            MimeMessage mime = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, false, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // HTML
            mailSender.send(mime);
        } catch (Exception e) {
            throw new RuntimeException("HTML e-posta gönderilemedi", e);
        }
    }

    /**
     * Ek(attachment) ile mail gönderimi.
     * @param to         alıcı
     * @param subject    konu
     * @param body       düz metin gövde (HTML değil)
     * @param filename   ek dosya adı (örn. "cv.pdf")
     * @param bytes      ek dosyanın byte içeriği
     * @param contentType ek MIME türü (örn. "application/pdf")
     */
    public void sendEmailWithAttachment(String to,
                                        String subject,
                                        String body,
                                        String filename,
                                        byte[] bytes,
                                        String contentType) {
        try {
            MimeMessage mime = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, false); // düz metin

            if (bytes != null && bytes.length > 0) {
                String safeName = (filename == null || filename.isBlank()) ? "attachment" : filename;
                String ct = (contentType == null || contentType.isBlank()) ? "application/octet-stream" : contentType;
                helper.addAttachment(safeName, new ByteArrayResource(bytes), ct);
            }

            mailSender.send(mime);
        } catch (Exception e) {
            throw new RuntimeException("Ekli e-posta gönderilemedi", e);
        }
    }
}

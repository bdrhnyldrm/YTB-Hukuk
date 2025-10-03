// src/main/java/com/ytb/lawfirm/web/UploadController.java
package com.ytb.lawfirm.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin/uploads")
public class UploadController {

    private final Path uploadDir;

    public UploadController(@Value("${app.upload.dir:uploads}") String uploadDir) {
        this.uploadDir = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadDir);
        } catch (Exception e) {
            throw new RuntimeException("Upload klasörü oluşturulamadı", e);
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, String> upload(@RequestParam("file") MultipartFile file) throws Exception {
        if (file.isEmpty()) throw new IllegalArgumentException("Dosya boş");

        String contentType = Optional.ofNullable(file.getContentType()).orElse("");
        if (!contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Sadece resim yüklenebilir");
        }

        String ext = "";
        String original = file.getOriginalFilename();
        if (original != null) {
            String cleaned = StringUtils.cleanPath(original);
            int dot = cleaned.lastIndexOf('.');
            if (dot >= 0) ext = cleaned.substring(dot);
        }

        String name = UUID.randomUUID().toString().replace("-", "") + ext.toLowerCase();
        Path target = uploadDir.resolve(name);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        // Frontend bu URL'yi direkt <img src="..."> olarak kullanacak
        return Map.of("url", "/uploads/" + name);
    }
}

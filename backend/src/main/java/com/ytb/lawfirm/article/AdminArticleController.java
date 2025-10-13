package com.ytb.lawfirm.article;

import com.ytb.lawfirm.article.dto.ArticleCreateUpdate;
import com.ytb.lawfirm.article.dto.ArticleSummary;
import com.ytb.lawfirm.article.dto.ArticleDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;
import java.util.List;

import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api/admin/articles")
@RequiredArgsConstructor
public class AdminArticleController {

    private final ArticleService service;

    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    @GetMapping
    public Page<ArticleSummary> listAll(
            @RequestParam(required = false) List<Long> authorId,
            @RequestParam(required = false) List<PracticeArea> area,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Boolean published,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        var data = service.search(
                published, authorId, area, q,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"))
        );
        return data.map(this::toSummary);
    }

    @GetMapping("/{id}")
    public ArticleDetail getOne(@PathVariable Long id) {
        var a = service.getById(id);
        return toDetail(a);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Long create(Authentication auth, @ModelAttribute ArticleCreateUpdate in) {
        return service.create(auth.getName(), in, in.getCover()).getId();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void update(@PathVariable Long id, @ModelAttribute ArticleCreateUpdate in) {
        service.update(id, in, in.getCover());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PostMapping(value = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        Path target = uploadDir.resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        String fileUrl = baseUrl + "/files/" + filename;
        return Map.of("url", fileUrl);
    }

    private ArticleSummary toSummary(Article a) {
        var s = new ArticleSummary();
        s.setId(a.getId());
        s.setTitle(a.getTitle());
        s.setSlug(a.getSlug());
        s.setSummary(a.getSummary());
        s.setAuthorName(a.getAuthor().getFullName());
        s.setAreas(a.getAreas());
        s.setCreatedAt(a.getCreatedAt());
        s.setPublished(a.isPublished());
        s.setCoverUrl(a.getCoverUrl());
        return s;
    }

    private ArticleDetail toDetail(Article a) {
        var d = new ArticleDetail();
        d.setId(a.getId());
        d.setTitle(a.getTitle());
        d.setSlug(a.getSlug());
        d.setSummary(a.getSummary());
        d.setContent(a.getContent());
        d.setAuthorName(a.getAuthor().getFullName());
        d.setAreas(a.getAreas());
        d.setCreatedAt(a.getCreatedAt());
        d.setPublished(a.isPublished());
        d.setCoverUrl(a.getCoverUrl());
        return d;
    }
}

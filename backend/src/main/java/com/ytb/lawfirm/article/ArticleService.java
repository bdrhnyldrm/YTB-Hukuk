package com.ytb.lawfirm.article;

import com.ytb.lawfirm.article.dto.ArticleCreateUpdate;
import com.ytb.lawfirm.user.User;
import com.ytb.lawfirm.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository repo;
    private final UserRepository users;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public Page<Article> search(Boolean published, Long authorId, PracticeArea area, String q, Pageable p) {
        return repo.search(published, authorId, area, q, p);
    }

    public Article getPublishedBySlug(String slug) {
        return repo.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new IllegalArgumentException("Makale bulunamadı"));
    }

    public Article create(String username, ArticleCreateUpdate in, MultipartFile cover) {
        User author = users.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Yazar bulunamadı"));

        Article a = Article.builder()
                .title(in.getTitle())
                .slug(slugOr(in.getSlug(), in.getTitle()))
                .summary(in.getSummary())
                .content(in.getContent())
                .areas(in.getAreas())
                .published(in.getPublished() == null ? true : in.getPublished())
                .author(author)
                .build();

        a = repo.save(a); // id burada oluşur

        if (cover != null && !cover.isEmpty()) {
            try {
                String url = saveCoverFile(a.getId(), cover);
                a.setCoverUrl(url);
                a = repo.save(a);
            } catch (IOException e) {
                throw new RuntimeException("Kapak fotoğrafı kaydedilemedi", e);
            }
        }

        return a;
    }

    public Article update(Long id, ArticleCreateUpdate in, MultipartFile cover) {
        Article a = repo.findById(id).orElseThrow();
        if (StringUtils.hasText(in.getTitle())) a.setTitle(in.getTitle());
        if (StringUtils.hasText(in.getSlug())) a.setSlug(in.getSlug());
        a.setSummary(in.getSummary());
        if (StringUtils.hasText(in.getContent())) a.setContent(in.getContent());
        if (in.getAreas() != null) a.setAreas(in.getAreas());
        if (in.getPublished() != null) a.setPublished(in.getPublished());

        if (cover != null && !cover.isEmpty()) {
            try {
                String url = saveCoverFile(a.getId(), cover);
                a.setCoverUrl(url);
            } catch (IOException e) {
                throw new RuntimeException("Kapak fotoğrafı güncellenemedi", e);
            }
        }

        return repo.save(a);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    private String slugOr(String provided, String title) {
        if (StringUtils.hasText(provided))
            return provided.trim().toLowerCase().replaceAll("[^a-z0-9-]", "-");
        return title.toLowerCase()
                .replace("ğ", "g").replace("ü", "u").replace("ş", "s").replace("ı", "i").replace("ö", "o").replace("ç", "c")
                .replaceAll("[^a-z0-9\\s-]", "")
                .trim().replaceAll("\\s+", "-");
    }

    public Article getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Makale bulunamadı: " + id));
    }

    private String saveCoverFile(Long articleId, MultipartFile cover) throws IOException {
        String ext = StringUtils.getFilenameExtension(cover.getOriginalFilename());
        if (ext == null) ext = "jpg";
        Path dir = Paths.get(uploadDir, "articles", articleId.toString());
        Files.createDirectories(dir);
        String filename = "cover-" + UUID.randomUUID() + "." + ext.toLowerCase();
        Path dest = dir.resolve(filename);
        Files.copy(cover.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);
        return "/files/articles/" + articleId + "/" + filename;
    }
}

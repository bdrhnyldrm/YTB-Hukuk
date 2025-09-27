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

@RestController
@RequestMapping("/api/admin/articles")
@RequiredArgsConstructor
public class AdminArticleController {

    private final ArticleService service;

    @GetMapping
    public Page<ArticleSummary> listAll(
            @RequestParam(required = false) Long authorId,
            @RequestParam(required = false) PracticeArea area,
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
        s.setCoverUrl(a.getCoverUrl()); // ✅ Kapak fotoğrafı eklendi
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
        d.setCoverUrl(a.getCoverUrl()); // ✅ Kapak fotoğrafı eklendi
        return d;
    }
}

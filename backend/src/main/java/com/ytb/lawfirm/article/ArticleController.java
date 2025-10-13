package com.ytb.lawfirm.article;

import com.ytb.lawfirm.article.dto.ArticleDetail;
import com.ytb.lawfirm.article.dto.ArticleSummary;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;
import com.ytb.lawfirm.article.dto.AuthorDto;
import com.ytb.lawfirm.user.User;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService service;

    @GetMapping
    public Page<ArticleSummary> list(
            @RequestParam(required = false) List<Long> authorId,
            @RequestParam(required = false) List<PracticeArea> area,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        var data = service.search(true, authorId, area, q,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        return data.map(this::toSummary);
    }

    @GetMapping("/{slug}")
    public ArticleDetail detail(@PathVariable String slug) {
        var a = service.getPublishedBySlug(slug);
        return toDetail(a);
    }

    @GetMapping("/authors")
    public List<AuthorDto> listAuthors() {
        return service.getDistinctAuthors().stream()
                .map(u -> new AuthorDto(u.getId(), u.getFullName()))
                .toList();
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
        d.setAuthorName(a.getAuthor().getFullName());
        d.setAreas(a.getAreas());
        d.setCreatedAt(a.getCreatedAt());
        d.setPublished(a.isPublished());
        d.setContent(a.getContent());
        d.setCoverUrl(a.getCoverUrl()); // ✅ Kapak fotoğrafı eklendi
        return d;
    }
}

package com.ytb.lawfirm.article.dto;

import com.ytb.lawfirm.article.PracticeArea;
import lombok.Data;
import java.time.Instant;
import java.util.Set;

@Data
public class ArticleSummary {
    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String authorName;
    private Set<PracticeArea> areas;
    private Instant createdAt;
    private Boolean published;
    private String coverUrl;
}

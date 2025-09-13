package com.ytb.lawfirm.article.dto;

import com.ytb.lawfirm.article.PracticeArea;
import lombok.Data;
import java.util.Set;

@Data
public class ArticleCreateUpdate {
    private String title;
    private String slug;     // opsiyonel – boşsa service slug üretir
    private String summary;  // opsiyonel
    private String content;
    private Set<PracticeArea> areas;
    private Boolean published; // opsiyonel (null ise true varsayılır)
}

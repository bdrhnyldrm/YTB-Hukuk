package com.ytb.lawfirm.article;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    Optional<Article> findBySlugAndPublishedTrue(String slug);

    @Query("""
        select a from Article a
        where (:published is null or a.published = :published)
          and (:authorId is null or a.author.id = :authorId)
          and (:area is null or :area member of a.areas)
          and (:q is null or lower(a.title) like lower(concat('%', :q, '%')))
        """)
    Page<Article> search(
            @Param("published") Boolean published,
            @Param("authorId") Long authorId,
            @Param("area") PracticeArea area,
            @Param("q") String q,
            Pageable pageable
    );
}

package com.ytb.lawfirm.article;

import com.ytb.lawfirm.user.User;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    Optional<Article> findBySlugAndPublishedTrue(String slug);

    @Query("""
    select a from Article a
    where (:published is null or a.published = :published)
      and (:authorIds is null or a.author.id in :authorIds)
      and (:areas is null or exists (
        select area from a.areas area where area in :areas
      ))
      and (:q is null or lower(a.title) like lower(concat('%', :q, '%')))
""")
    Page<Article> search(
            @Param("published") Boolean published,
            @Param("authorIds") List<Long> authorIds,
            @Param("areas") List<PracticeArea> areas,
            @Param("q") String q,
            Pageable pageable
    );


    @Query("SELECT DISTINCT a.author FROM Article a WHERE a.published = true")
    List<User> findDistinctAuthors();
}

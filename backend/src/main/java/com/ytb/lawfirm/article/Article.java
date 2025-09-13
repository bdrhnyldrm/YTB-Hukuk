package com.ytb.lawfirm.article;

import com.ytb.lawfirm.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Article {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String title;

    @Column(unique=true, nullable=false)
    private String slug; // URL dostu

    @Column(length = 2000)
    private String summary;

    @Lob
    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String content;

    @ElementCollection(targetClass = PracticeArea.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name="article_areas", joinColumns=@JoinColumn(name="article_id"))
    @Column(name="area")
    private Set<PracticeArea> areas = new HashSet<>();

    private boolean published = true;

    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="author_id")
    private User author;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;
}

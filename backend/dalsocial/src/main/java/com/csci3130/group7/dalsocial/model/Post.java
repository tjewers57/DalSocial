package com.csci3130.group7.dalsocial.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDate postDate;

    private String title;

    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User postOwner;

    public Integer getId() {
        return id;
    }

    public LocalDate getPostDate() {
        return postDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getPostOwner() {
        return postOwner;
    }

    public void setPostOwner(User postOwner) {
        this.postOwner = postOwner;
    }

    public Post(){

    }

    public Post(Integer id, String title, String content, User user) {
        this.id = id;
        this.postDate = LocalDate.now();
        this.title = title;
        this.content = content;
        this.postOwner = user;
    }
}

Post Model:

        package com.csci3130.group7.dalsocial.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
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
    private Integer userId;
    private int likes = 0;
    private int dislikes = 0;

    // Getters and Setters

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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

    // Constructors

    public Post() {
    }

    public Post(Integer id, String title, String content, Integer userId) {
        this.id = id;
        this.postDate = LocalDate.now();
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
}


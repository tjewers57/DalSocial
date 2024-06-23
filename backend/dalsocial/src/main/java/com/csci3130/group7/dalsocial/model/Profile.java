package com.csci3130.group7.dalsocial.model;

import jakarta.persistence.*;

@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String bio;

    @Enumerated(EnumType.STRING)
    private ProfileStatus status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public ProfileStatus getStatus() {
        return status;
    }

    public void setStatus(ProfileStatus status) {
        this.status = status;
    }

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public Profile(){}

    public Profile(Integer id, String bio, ProfileStatus status, User user) {
        this.id = id;
        this.bio = bio;
        this.status = status;
        this.user = user;
    }
}

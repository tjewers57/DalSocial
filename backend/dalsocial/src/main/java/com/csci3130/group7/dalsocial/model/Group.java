package com.csci3130.group7.dalsocial.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String description;

    private Integer ownerId;

    //@ManyToMany(mappedBy = "groups")
    //private Set<User> members = new HashSet<User>();

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOwner() {
        return ownerId;
    }

    public void setOwner(Integer ownerId) {
        this.ownerId = ownerId;
    }

    /*public Set<User> getMembers() {
        return members;
    }

    public void setMembers(Set<User> members) {
        this.members = members;
    }*/

    public Group(){

    }

    public Group(Integer id, String name, String description, Integer ownerId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
    }
}

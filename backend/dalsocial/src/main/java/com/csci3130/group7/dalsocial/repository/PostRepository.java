package com.csci3130.group7.dalsocial.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csci3130.group7.dalsocial.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    
    List<Post> findByPostDate(LocalDate postDate);

    List<Post> findAllByUserId(Integer user_Id);

}

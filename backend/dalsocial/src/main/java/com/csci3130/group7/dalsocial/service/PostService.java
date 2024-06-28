package com.csci3130.group7.dalsocial.service;

import com.csci3130.group7.dalsocial.model.Post;

import java.util.List;

public interface PostService {
    
    String createPost(Post post);

    List<Post> fetchAllPostsByUserId(Integer userId);

    Post findPostById(Integer id);

    String deletePost(Integer id);

    String updatePost(Post post);
}

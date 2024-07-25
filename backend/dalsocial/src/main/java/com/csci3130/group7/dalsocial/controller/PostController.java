package com.csci3130.group7.dalsocial.controller;

import com.csci3130.group7.dalsocial.model.Post;
import com.csci3130.group7.dalsocial.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class PostController {
    @Autowired
    PostService postService;

    @PostMapping("/save")
    public String savePost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @GetMapping("/fetch/{userId}")
    public List<Post> fetchAllPosts(@PathVariable Integer userId) {
        return postService.fetchAllPostsByUserId(userId);
    }

    @GetMapping("/get/{id}")
    public Post getPostById(@PathVariable Integer id) {
        return postService.findPostById(id);
    }

    @PutMapping("/update")
    public String updateUser(@RequestBody Post post) {
        return postService.updatePost(post);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Integer id) {
        return postService.deletePost(id);
    }

    @PutMapping("/{id}/{likes}")
    public String likePost(@PathVariable Integer id, Integer likes) {return postService.likePost(id,likes);}

    @PutMapping("/dislikes/{id}")
    public String dislikePost(@PathVariable Integer id) {return postService.dislikePost(id);}
}

package com.csci3130.group7.dalsocial.controller;

import com.csci3130.group7.dalsocial.model.Post;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.service.PostService;
import com.csci3130.group7.dalsocial.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import utils.LoginInfo;

import java.util.List;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class PostController {
    @Autowired
    PostService postService;

    @PostMapping("/save")
    public String savePost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @GetMapping("/fetch")
    public List<Post> fetchAllPosts(@RequestBody User postOwner) {
        return postService.fetchAllPostsByUser(postOwner);
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
}

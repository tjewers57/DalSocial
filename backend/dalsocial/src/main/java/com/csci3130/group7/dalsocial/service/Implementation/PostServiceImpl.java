package com.csci3130.group7.dalsocial.service.Implementation;

import com.csci3130.group7.dalsocial.model.Post;
import com.csci3130.group7.dalsocial.repository.PostRepository;
import com.csci3130.group7.dalsocial.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostRepository postRepository;

    @Override
    public String createPost(Post post) {
        if (post == null) {
            return "Error, post not saved";
        }
        postRepository.save(post);
        return "Post created successfully";
    }

    @Override
    public List<Post> fetchAllPostsByUserId(Integer userId) {
        return postRepository.findAllByUserId(userId);
    }

    @Override
    public Post findPostById(Integer id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        return optionalPost.orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

    @Override
    public String deletePost(Integer id) {
        postRepository.deleteById(id);
        return "Post deleted successfully";
    }

    @Override
    public String updatePost(Post post) {
        Optional<Post> optionalPost = postRepository.findById(post.getId());
        if (optionalPost.isPresent()) {
            Post existingPost = optionalPost.get();
            existingPost.setContent(post.getContent());
            existingPost.setTitle(post.getTitle());
            postRepository.save(existingPost);
            return "Post successfully updated";
        } else {
            return "Post not found with id: " + post.getId();
        }
    }

    @Override
    public String likePost(Integer id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setLikes(post.getLikes() + 1);
            postRepository.save(post);
            return "Post liked successfully";
        } else {
            return "Post not found with id: " + id;
        }
    }

    @Override
    public String dislikePost(Integer id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setDislikes(post.getDislikes() + 1);
            postRepository.save(post);
            return "Post disliked successfully";
        } else {
            return "Post not found with id: " + id;
        }
    }
}

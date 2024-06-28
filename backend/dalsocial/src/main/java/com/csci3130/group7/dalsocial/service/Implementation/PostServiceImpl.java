package com.csci3130.group7.dalsocial.service.Implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csci3130.group7.dalsocial.model.Post;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.repository.PostRepository;
import com.csci3130.group7.dalsocial.service.PostService;

@Service
public class PostServiceImpl implements PostService{
    
    @Autowired
    PostRepository postRepository;

    @Override
    public String createPost(Post post){
        if(post == null) {return "Error, post not saved";}

        postRepository.save(post);
        return "Post created successfully";
    }

    @Override
    public List<Post> fetchAllPostsByUserId(Integer userId){
        return postRepository.findAllByUserId(userId);
    }

    @Override
    public Post findPostById(Integer id){
        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isPresent()){
            return optionalPost.get();
        }
        else{
            System.out.println("Post not found with id: " + id);
            throw new RuntimeException("Post not found with id: " + id);
        }
    }

    @Override
    public String deletePost(Integer id){
        postRepository.deleteById(id);
        return "Post deleted successfully";
    }

    @Override
    public String updatePost(Post post){
        Optional<Post> optionalPost = postRepository.findById(post.getId());
        if(optionalPost.isPresent()){
            Post post1 = optionalPost.get();
            post1.setContent(post.getContent());
            post1.setTitle(post.getTitle());
            postRepository.save(post1);
            return "Post successfully updated";
        }
        else{
            return "Post not found with id: " + post.getId();
        }
    }
}

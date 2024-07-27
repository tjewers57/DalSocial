package com.csci3130.group7.dalsocial;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.csci3130.group7.dalsocial.model.Post;
import com.csci3130.group7.dalsocial.repository.PostRepository;
import com.csci3130.group7.dalsocial.service.Implementation.PostServiceImpl;

@ExtendWith(MockitoExtension.class)
public class PostServiceTests {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostServiceImpl postService;

    @Before()
    public void setup(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreatePost(){
        Post post = new Post();
        post.setTitle("hello");
        post.setContent("test");
        post.setUserId(1);

        when(postRepository.save(post)).thenReturn(post);
        assertEquals("Post created successfully", postService.createPost(post));
    }

    @Test
    public void testFetchAllPostsByUserId(){
        Post post1 = new Post();
        post1.setTitle("first");
        post1.setContent("first content");
        post1.setUserId(1);

        Post post2 = new Post();
        post2.setTitle("second");
        post2.setContent("second content");
        post2.setUserId(1);

        Post post3 = new Post();
        post3.setTitle("third");
        post3.setContent("third content");
        post3.setUserId(3);

        postRepository.save(post1);
        postRepository.save(post2);
        postRepository.save(post3);

        when(postRepository.findAllByUserId(1)).thenReturn(List.of(post1, post2));
        assertEquals(List.of(post1, post2), postService.fetchAllPostsByUserId(1));
    }

    @Test
    public void testFindPostById(){
        Post post = new Post();
        int id = anyInt();

        when(postRepository.findById(id)).thenReturn(Optional.of(post));
        assertEquals(post, postService.findPostById(id));
    }

    @Test
    public void testDeletePost(){
        Post post = new Post();
        post.setTitle("hello");
        post.setContent("test");
        post.setUserId(1);

        when(postRepository.save(post)).thenReturn(post);
        assertEquals("Post deleted successfully", postService.deletePost(anyInt()));
    }

    @Test
    public void testUpdatePost(){
        Post post = new Post();
        post.setTitle("hello");
        post.setContent("test");
        post.setUserId(1);

        when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));
        assertEquals("Post successfully updated", postService.updatePost(post));

    }
}

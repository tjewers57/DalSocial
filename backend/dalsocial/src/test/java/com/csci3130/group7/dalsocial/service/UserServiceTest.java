package com.csci3130.group7.dalsocial.service;

import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.repository.UserRepository;
import com.csci3130.group7.dalsocial.service.Implementation.UserServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Before()
    public void setup(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void createReturnsErrorWhenUserIsNull(){
        Assertions.assertEquals("Error, user not saved", userService.createUser(null));
    }

    @Test
    public void createReturnsErrorWhenEmailIsInvalid(){
        // only dal students/faculty can use the app, so the domain name must be "@dal.ca"
        User notDal = new User();
        notDal.setEmail("john@mail.com");

        // no host portion -> not a valid email
        User notLongEnough = new User();
        notLongEnough.setEmail("@dal.ca");

        Assertions.assertEquals("Invalid email address, please enter a valid Dalhousie email address", userService.createUser(notDal));
        Assertions.assertEquals("Invalid email address, please enter a valid Dalhousie email address", userService.createUser(notLongEnough));
    }

    @Test
    public void createReturnsErrorWhenEmailAlreadyInUse(){
        User john = new User();
        john.setEmail("j@dal.ca");
        john.setPassword("Password1!");

        User jane = new User();
        jane.setEmail("j@dal.ca");
        jane.setPassword("Password2!");

        when(userRepository.findByEmail("j@dal.ca")).thenReturn(john);

        Assertions.assertEquals("An account with this email already exists", userService.createUser(jane));
    }

    @Test
    public void createReturnsErrorWhenPasswordIsInvalid(){
        User notStrongEnough = new User();
        notStrongEnough.setEmail("john@dal.ca");
        notStrongEnough.setPassword("123456");

        Assertions.assertEquals("Password does not meet all requirements", userService.createUser(notStrongEnough));
    }

    @Test
    public void createSavesUser(){
        User john = new User();
        john.setEmail("j@dal.ca");
        john.setPassword("Password1!");

        when(userRepository.save(john)).thenReturn(john);

        Assertions.assertEquals("User created successfully", userService.createUser(john));
    }

    @Test
    public void fetchReturnsEmptyList(){
        when(userRepository.findAll()).thenReturn(List.of());
        Assertions.assertTrue(userService.fetchAllUsers().isEmpty());
    }

    @Test
    public void fetchReturnsListOfUsers(){
        User john = new User();
        john.setEmail("j@dal.ca");
        john.setPassword("Password1!");
        when(userRepository.findAll()).thenReturn(List.of(john));

        Assertions.assertEquals(List.of(john), userService.fetchAllUsers());
    }

    @Test (expected = RuntimeException.class)
    public void findByIdReturnsErrorWhenUserDoesNotExist(){
        int id = anyInt();
        when(userRepository.findById(id)).thenReturn(null);
        userService.findUserById(id);
    }

    @Test
    public void findByIdReturnsUser(){
        int id = anyInt();

        User john = new User();
        john.setEmail("j@dal.ca");
        john.setPassword("Password1!");

        when(userRepository.findById(id)).thenReturn(Optional.of(john));

        Assertions.assertEquals(john, userService.findUserById(id));
    }

    @Test
    public void findByFirstNameReturnsEmptyList(){
        when(userRepository.findByFirstName(anyString())).thenReturn(List.of());
        Assertions.assertTrue(userService.fetchAllUsers().isEmpty());
    }

    @Test
    public void findByFirstNameReturnsListOfUsers(){
        User john = new User();
        john.setFirstName("John");
        john.setEmail("j@dal.ca");
        john.setPassword("Password1!");

        when(userRepository.findByFirstName("John")).thenReturn(List.of(john));
    }

    @Test
    public void findByEmailReturnsNull(){
        when(userRepository.findByEmail(anyString())).thenReturn(null);
        Assertions.assertNull(userService.findByEmail(anyString()));
    }

    @Test
    public void findByEmailReturnsUser(){
        User john = new User();
        john.setFirstName("John");
        john.setEmail("j@dal.ca");
        john.setPassword("Password1!");

        when(userRepository.findByEmail("j@dal.ca")).thenReturn(john);
        Assertions.assertEquals(john, userService.findByEmail("j@dal.ca"));
    }






}

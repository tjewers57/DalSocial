package com.csci3130.group7.dalsocial;

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

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

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
        // no host portion -> not a valid email
        User notLongEnough = new User();
        notLongEnough.setEmail("@dal.ca");
        Assertions.assertEquals("Invalid email address, please enter a valid Dalhousie email address", userService.createUser(notLongEnough));
    }

    @Test
    public void createReturnsErrorWhenEmailIsNotDalEmail(){
        // only dal students/faculty can use the app, so the domain name must be "@dal.ca"
        User notDal = new User();
        notDal.setEmail("john@mail.com");
        Assertions.assertEquals("Invalid email address, please enter a valid Dalhousie email address", userService.createUser(notDal));
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
    public void findByIdThrowsExceptionWhenUserDoesNotExist(){
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
        Assertions.assertTrue(userService.findByFirstName(anyString()).isEmpty());
    }

    @Test
    public void findByFirstNameReturnsListOfUsers(){
        User john = new User();
        john.setFirstName("John");
        john.setEmail("j@dal.ca");
        john.setPassword("Password1!");

        when(userRepository.findByFirstName("John")).thenReturn(List.of(john));
        Assertions.assertTrue(userService.findByFirstName("John").contains(john));
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

    @Test
    public void updateReturnsErrorWhenUserDoesntExist(){
        int id = anyInt();
        User user = new User();
        user.setId(id);
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());
        Assertions.assertEquals("User not found with id: " + user.getId(), userService.updateUser(user));
    }

    @Test
    public void updateReturnsErrorWhenPasswordInvalid(){
        User john = new User();
        john.setEmail("john@dal.ca");
        john.setPassword("Password1");
        when(userRepository.findById(john.getId())).thenReturn(Optional.of(john));
        Assertions.assertEquals("Password does not meet all requirements", userService.updateUser(john));
    }

    @Test
    public void updateUpdatesUser(){
        User john = new User();
        john.setEmail("john@dal.ca");
        john.setPassword("Password1!");
        when(userRepository.findById(john.getId())).thenReturn(Optional.of(john));
        Assertions.assertEquals("User successfully updated", userService.updateUser(john));
    }

    @Test
    public void deleteDeletesUser(){
        Assertions.assertEquals("User deleted successfully", userService.deleteUser(anyInt()));
    }

    @Test
    public void authenticateReturnsErrorWhenUserDoesNotExist(){
        when(userRepository.findByEmail(anyString())).thenReturn(null);
        Assertions.assertEquals("An account with this email does not exist", userService.authenticateUser("john@dal.ca", "test"));
    }

    @Test
    public void authenticateReturnsErrorWhenPasswordIncorrect(){
        User john = new User();
        john.setEmail("john@dal.ca");
        john.setPassword("Password1!");

        when(userRepository.findByEmail(anyString())).thenReturn(john);
        Assertions.assertEquals("Incorrect password", userService.authenticateUser("john@dal.ca", "incorrect"));
    }

    @Test
    public void authenticateReturnsSuccessfulWhenPasswordCorrect(){
        User john = new User();
        john.setEmail("john@dal.ca");
        john.setPassword("Password1!");

        when(userRepository.findByEmail(anyString())).thenReturn(john);
        Assertions.assertEquals("User authenticated successfully", userService.authenticateUser("john@dal.ca", "Password1!"));
    }

    @Test
    public void answerCheckReturnsFalseWhenUserDoesntExist(){
        when(userRepository.findByEmail(anyString())).thenReturn(null);
        Assertions.assertFalse(userService.correctAnswer("john@dal.ca", "test"));
    }

    @Test
    public void answerCheckReturnsFalseWhenAnswerIncorrect(){
        User john = new User();
        john.setEmail("john@dal.ca");
        john.setPassword("Password1!");
        john.setSecurityAnswer("Correct");
        when(userRepository.findByEmail(anyString())).thenReturn(john);
        Assertions.assertFalse(userService.correctAnswer("john@dal.ca", "incorrect"));
    }

    @Test
    public void answerCheckReturnsTrueWhenAnswerCorrect(){
        User john = new User();
        john.setEmail("john@dal.ca");
        john.setPassword("Password1!");
        john.setSecurityAnswer("Correct");
        when(userRepository.findByEmail(anyString())).thenReturn(john);
        Assertions.assertTrue(userService.correctAnswer("john@dal.ca", "Correct"));
    }






}

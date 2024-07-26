package com.csci3130.group7.dalsocial.service;

import com.csci3130.group7.dalsocial.model.User;

import java.util.List;

public interface UserService {

    String createUser(User user);

    List<User> fetchAllUsers();

    User findUserById(Integer id);

    List<User> findByFirstName(String firstName);

    User findByEmail(String email);

    String updateUser(User user);

    String deleteUser(Integer id);

    String authenticateUser(String email, String password);

    boolean correctAnswer(String email, String securityAnswer);

    //Admin
    List<User> fetchPendingUsers();
}

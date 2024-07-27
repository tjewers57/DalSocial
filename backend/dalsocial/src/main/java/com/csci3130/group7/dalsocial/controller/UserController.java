package com.csci3130.group7.dalsocial.controller;

import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import utils.LoginInfo;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/save")
    public String saveUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/fetch")
    public List<User> fetchAllUsers() {
        return userService.fetchAllUsers();
    }

    @GetMapping("/get/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.findUserById(id);
    }

    @GetMapping("/getbyname/{firstname}")
    public List<User> getUserByFirstName(@PathVariable String firstname) {
        return userService.findByFirstName(firstname);
    }

    @GetMapping("/getbyemail/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @PutMapping("/update")
    public String updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Integer id) {
        return userService.deleteUser(id);
    }

    @PostMapping("/auth")
    public String authUser(@RequestBody LoginInfo loginInfo) {
        return userService.authenticateUser(loginInfo.getEmail(), loginInfo.getPassword());
    }

    @GetMapping("/checkanswer/{email}/{answer}")
    public boolean checkAnswer(@PathVariable String email, @PathVariable String answer) {
        return userService.correctAnswer(email, answer);
    }
    //Admin
    @GetMapping("/fetchPending")
    public List<User> fetchPendingUsers() {
        return userService.fetchPendingUsers();
    }
}

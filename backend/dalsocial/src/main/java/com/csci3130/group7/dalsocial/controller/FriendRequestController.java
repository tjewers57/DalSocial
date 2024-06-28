package com.csci3130.group7.dalsocial.controller;


import com.csci3130.group7.dalsocial.model.Friend;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.service.Implementation.FriendRequestServiceImpl;
import com.csci3130.group7.dalsocial.service.Implementation.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friend-requests")
public class FriendRequestController {

    @Autowired
    private FriendRequestServiceImpl friendRequestServiceImpl;

     @Autowired
    private UserServiceImpl userServiceImpl;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userServiceImpl.fetchAllUsers();

    }



    @PostMapping("/{senderId}/send-friend-request/{receiverId}")
    public Friend sendFriendRequest(@PathVariable Integer senderId, @PathVariable Integer receiverId) {
        // Assuming senderId and receiverId are provided from the client
        User sender = userServiceImpl.findUserById(senderId); // Get sender from database
        User receiver = userServiceImpl.findUserById(receiverId);// Get receiver from database
        return friendRequestServiceImpl.sendFriendRequest(sender, receiver);
    }



    @PostMapping("/accept/{requestId}")
    public void acceptFriendRequest(@PathVariable Long requestId) {
        friendRequestServiceImpl.acceptFriendRequest(requestId);
    }



    @DeleteMapping("/reject/{requestId}")
    public void rejectFriendRequest(@PathVariable Long requestId) {
        friendRequestServiceImpl.rejectFriendRequest(requestId);
    }
    // Please note that delete the friend request by Id is also delete the associate user from user Table
    // Working to find the fix for the bug

}

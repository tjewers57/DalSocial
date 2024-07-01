package com.csci3130.group7.dalsocial.controller;


import com.csci3130.group7.dalsocial.model.Friend;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.service.FriendRequestService;
import com.csci3130.group7.dalsocial.service.Implementation.FriendRequestServiceImpl;
import com.csci3130.group7.dalsocial.service.Implementation.UserServiceImpl;
import com.csci3130.group7.dalsocial.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friend-requests")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FriendRequestController {

    @Autowired
    private FriendRequestService friendRequestService;

    @Autowired
    private UserService userService;

    @PostMapping("/{senderId}/send-friend-request/{receiverId}")
    public String sendFriendRequest(@PathVariable Integer senderId, @PathVariable Integer receiverId) {
        // Assuming senderId and receiverId are provided from the client
        User sender = userService.findUserById(senderId); // Get sender from database
        User receiver = userService.findUserById(receiverId);// Get receiver from database
        return friendRequestService.sendFriendRequest(sender, receiver);
    }

    @PostMapping("/accept/{requestId}")
    public void acceptFriendRequest(@PathVariable Long requestId) {
        friendRequestService.acceptFriendRequest(requestId);
    }

    @PostMapping("/acceptbyusers/{senderId}/{receiverId}")
    public String acceptFriendRequestByUsers(@PathVariable Integer senderId, @PathVariable Integer receiverId) {
        User sender = userService.findUserById(senderId);
        User receiver = userService.findUserById(receiverId);
        return friendRequestService.acceptBySenderAndReceiver(sender, receiver);
    }

    @GetMapping("/fetch")
    public List<Friend> getAllFriends() {
        return friendRequestService.fetchAllFriends();
    }

    @GetMapping("/getfriendsbyid/{receiverId}/{status}")
    public List<Friend> getFriendsbyid(@PathVariable Integer receiverId, @PathVariable boolean status) {
        return friendRequestService.findAllByReceiverIdAndStatus(receiverId, status);
    }

    @GetMapping("/checkrequeststatus/{senderId}/{receiverId}")
    public String checkRequestStatus(@PathVariable Integer senderId, @PathVariable Integer receiverId) {
        User sender = userService.findUserById(senderId);
        User receiver = userService.findUserById(receiverId);

        if(friendRequestService.checkIfUsersAreFriends(sender, receiver)) {
            return "Users are friends";
        } else if (friendRequestService.checkIfRequestSent(senderId, receiverId)) {
            return "Pending";
        } else if (friendRequestService.checkIfRequestPending(senderId, receiverId)) {
            return "Awaiting response";
        } else {
            return "No request pending";
        }
    }

    @DeleteMapping("/reject/{requestId}")
    public String rejectFriendRequest(@PathVariable Long requestId) {
        return friendRequestService.rejectFriendRequest(requestId);
    }

    @DeleteMapping("/deletebyusers/{senderId}/{receiverId}")
    public String deleteFriendRequest(@PathVariable Integer senderId, @PathVariable Integer receiverId) {
        User sender = userService.findUserById(senderId);
        User receiver = userService.findUserById(receiverId);
        return friendRequestService.deleteBySenderAndReceiver(sender, receiver);
    }
}

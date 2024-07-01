package com.csci3130.group7.dalsocial.service;

import com.csci3130.group7.dalsocial.model.Friend;
import com.csci3130.group7.dalsocial.model.User;

import java.util.List;

public interface FriendRequestService {

    public List<Friend> fetchAllFriends();

    public String sendFriendRequest(User sender, User receiver);

    public void acceptFriendRequest(Long requestId);

    public String acceptBySenderAndReceiver(User sender, User receiver);

    public String rejectFriendRequest(Long requestId);

    public String deleteBySenderAndReceiver(User sender, User receiver);

    public List<Friend> findAllByReceiverIdAndStatus(Integer receiverId, boolean status);

    public boolean checkIfUsersAreFriends(User sender, User receiver);

    public boolean checkIfRequestSent(Integer senderId, Integer receiverId);

    public boolean checkIfRequestPending(Integer receiverId, Integer senderId);
}

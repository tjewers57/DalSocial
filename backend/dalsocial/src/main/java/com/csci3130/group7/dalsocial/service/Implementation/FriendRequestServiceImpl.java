package com.csci3130.group7.dalsocial.service.Implementation;

import com.csci3130.group7.dalsocial.model.Friend;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.repository.UserRepository;
import com.csci3130.group7.dalsocial.service.FriendRequestService;
import jdk.jshell.Snippet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.csci3130.group7.dalsocial.repository.FriendRequestRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendRequestServiceImpl implements FriendRequestService {

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Override
    public String sendFriendRequest(User sender, User receiver) {
        Friend friendRequest = new Friend();
        friendRequest.setSender(sender);
        friendRequest.setReceiver(receiver);
        friendRequest.setStatus(false); // Initially not accepted
        if(friendRequestRepository.findBySenderAndReceiver(sender, receiver) == null) {
            friendRequestRepository.save(friendRequest);
            return "Friend request sent";
        } else if (!friendRequestRepository.findBySenderAndReceiver(sender, receiver).getStatus()) {
            return "Friend request already sent";
        } else {
            return "Error, users are already friends";
        }
    }

    @Override
    public String acceptBySenderAndReceiver(User sender, User receiver) {
        Friend friend = friendRequestRepository.findBySenderAndReceiver(sender, receiver);
        if (friend != null) {
            friend.setStatus(true);
            friendRequestRepository.save(friend);
            return "Friend request accepted";
        } else {
            return "Error, request not accepted";
        }
    }

    @Override
    public List<Friend> findAllFriendsOfUser(Integer userId) {
        List<Friend> receiverSide = friendRequestRepository.findAllByReceiverIdAndStatus(userId, true);
        List<Friend> senderSide = friendRequestRepository.findAllBySenderIdAndStatus(userId, true);
        receiverSide.addAll(senderSide);
        return receiverSide;
    }

    @Override
    public List<Friend> findAllOutgoingRequests(Integer userId) {
        return friendRequestRepository.findAllBySenderIdAndStatus(userId, false);
    }

    @Override
    public List<Friend> findAllIncomingRequests(Integer userId) {
        return friendRequestRepository.findAllByReceiverIdAndStatus(userId, false);
    }

    @Override
    public boolean checkIfUsersAreFriends(User sender, User receiver) {
        Friend senderSide = friendRequestRepository.findBySenderAndReceiver(sender, receiver);
        Friend receiverSide = friendRequestRepository.findBySenderAndReceiver(receiver, sender);
        return ((senderSide != null && senderSide.getStatus()) || (receiverSide != null && receiverSide.getStatus()));
    }

    @Override
    public boolean checkIfRequestSent(Integer senderId, Integer receiverId) {
        List<Friend> friends = friendRequestRepository.findAllBySenderIdAndStatus(senderId, false);
        return friends.stream().anyMatch(friend -> friend.getReceiver().getId().equals(receiverId));
    }

    @Override
    public boolean checkIfRequestPending(Integer receiverId, Integer senderId) {
        List<Friend> friends = friendRequestRepository.findAllByReceiverIdAndStatus(receiverId, false);
        return friends.stream().anyMatch(friend -> friend.getSender().getId().equals(senderId));
    }

    @Override
    public String deleteBySenderAndReceiver(User sender, User receiver) {
        Friend senderSide = friendRequestRepository.findBySenderAndReceiver(sender, receiver);
        Friend receiverSide = friendRequestRepository.findBySenderAndReceiver(receiver, sender);
        if(senderSide != null) {
            friendRequestRepository.delete(senderSide);
        } else if (receiverSide != null) {
            friendRequestRepository.delete(receiverSide);
        }
        return "Friend request deleted";
    }
}

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
    private UserRepository userRepository;



    public Friend sendFriendRequest(User sender, User receiver) {
        Friend friendRequest = new Friend();
        friendRequest.setSender(sender);
        friendRequest.setReceiver(receiver);
        friendRequest.setStatus(false); // Initially not accepted

        return friendRequestRepository.save(friendRequest);

    }

    public void acceptFriendRequest(Long requestId) {
        Friend friendRequest = friendRequestRepository.findById(requestId).orElse(null);
        if (friendRequest != null) {
            friendRequest.setStatus(true);
            friendRequestRepository.save(friendRequest);

        }


    }

    public String rejectFriendRequest(Long requestId) {


        friendRequestRepository.deleteById(requestId);

        return "Friend request rejected";
    }

    @Override
    public List<Friend> findAllByReceiverIdAndStatus(Integer receiverId, boolean status) {
        return friendRequestRepository.findAllByReceiverIdAndStatus(receiverId, status);
    }


    public List<Friend> fetchAllfriends(){

        return friendRequestRepository.findAll();

    }

}

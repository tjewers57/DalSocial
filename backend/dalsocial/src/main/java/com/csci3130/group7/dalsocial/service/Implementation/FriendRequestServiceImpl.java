package com.csci3130.group7.dalsocial.service.Implementation;

import com.csci3130.group7.dalsocial.model.Friend;
import com.csci3130.group7.dalsocial.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.csci3130.group7.dalsocial.repository.FriendRequestRepository;

@Service
public class FriendRequestServiceImpl {

    @Autowired
    private FriendRequestRepository friendRequestRepository;



    public Friend sendFriendRequest(User sender, User receiver) {
        Friend friendRequest = new Friend();
        friendRequest.setSender(sender);
        friendRequest.setReceiver(receiver);
        friendRequest.setStatus(false); // Initially not accepted

        return friendRequestRepository.save(friendRequest);

    }

    public String acceptFriendRequest(Long requestId) {
        Friend friendRequest = friendRequestRepository.findById(requestId).orElse(null);
        if (friendRequest != null) {
            friendRequest.setStatus(true);
            friendRequestRepository.save(friendRequest);
            return "Friend request accepted";
        }

         return null;
    }

    public String rejectFriendRequest(Long requestId) {


        friendRequestRepository.deleteById(requestId);

        return "Friend request rejected";
    }

}

package com.csci3130.group7.dalsocial.repository;

import com.csci3130.group7.dalsocial.model.Friend;
import com.csci3130.group7.dalsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


    @Repository
    public interface FriendRequestRepository extends JpaRepository<Friend, Long> {

        Friend findBySenderAndReceiver(User sender, User receiver);

        void deleteBySenderAndReceiver(User sender, User receiver);

        List<Friend> findAllBySenderIdAndStatus(Integer senderId, boolean status);

        List<Friend> findAllByReceiverIdAndStatus(Integer receiverId, boolean status);
    }






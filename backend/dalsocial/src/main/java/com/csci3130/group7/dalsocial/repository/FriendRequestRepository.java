package com.csci3130.group7.dalsocial.repository;

import com.csci3130.group7.dalsocial.model.Friend;
import com.csci3130.group7.dalsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


    @Repository
    public interface FriendRequestRepository extends JpaRepository<Friend, Long> {

        List<Friend> findByReceiverAndStatus(User receiver, Friend status);

        List<Friend> findBySenderAndStatus(User sender, Friend status);


List<Friend> findById(long id);


    }






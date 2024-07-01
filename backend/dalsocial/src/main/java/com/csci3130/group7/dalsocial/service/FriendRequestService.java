package com.csci3130.group7.dalsocial.service;

import com.csci3130.group7.dalsocial.model.Friend;

import java.util.List;

public interface FriendRequestService {

    public List<Friend> findAllByReceiverIdAndStatus(Integer receiverId, boolean status);





}

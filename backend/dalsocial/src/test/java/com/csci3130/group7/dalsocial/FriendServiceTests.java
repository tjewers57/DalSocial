package com.csci3130.group7.dalsocial;

import com.csci3130.group7.dalsocial.model.Friend;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.repository.FriendRequestRepository;
import com.csci3130.group7.dalsocial.service.Implementation.FriendRequestServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FriendServiceTests {

    @Mock
    private FriendRequestRepository friendRequestRepository;

    @InjectMocks
    private FriendRequestServiceImpl friendRequestService;

    User sender;
    User receiver;

    @Before()
    public void setup() {
        MockitoAnnotations.openMocks(this);
        sender = new User();
        receiver = new User();
        int senderId = 1;
        sender.setId(senderId);
        int receiverId = 2;
        receiver.setId(receiverId);
    }

    @Test
    public void sendFriendRequestReturnsErrorWhenRequestAlreadySent(){
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(false);

        when(friendRequestRepository.findBySenderAndReceiver(sender, receiver)).thenReturn(request);
        Assert.assertEquals("Friend request already sent", friendRequestService.sendFriendRequest(sender, receiver));
    }

    @Test
    public void sendFriendRequestReturnsErrorWhenUsersAreFriends(){
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(true);

        when(friendRequestRepository.findBySenderAndReceiver(sender, receiver)).thenReturn(request);
        Assert.assertEquals("Error, users are already friends", friendRequestService.sendFriendRequest(sender, receiver));
    }

    @Test
    public void sendFriendRequestSendsRequest(){
        when(friendRequestRepository.findBySenderAndReceiver(sender, receiver)).thenReturn(null);
        when(friendRequestRepository.save(any())).thenReturn(new Friend());
        friendRequestService.sendFriendRequest(sender, receiver);
        Assert.assertEquals("Friend request sent", friendRequestService.sendFriendRequest(sender, receiver));
    }

    @Test
    public void acceptReturnsErrorWhenRequestDoesntExist(){
        when(friendRequestRepository.findBySenderAndReceiver(sender, receiver)).thenReturn(null);
        Assert.assertEquals("Error, request not accepted", friendRequestService.acceptBySenderAndReceiver(sender, receiver));
    }

    @Test
    public void acceptIsSuccessfulWhenRequestIsAccepted(){
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(false);
        when(friendRequestRepository.findBySenderAndReceiver(sender, receiver)).thenReturn(request);
        when(friendRequestRepository.save(any())).thenReturn(request);
        Assert.assertEquals("Friend request accepted", friendRequestService.acceptBySenderAndReceiver(sender, receiver));
    }

    @Test
    public void findAllFriendsOfUserReturnsListOfFriends(){
        // need to use ArrayLists here as List.of returns an immutable List and findAllFriendsOfUser modifies a list before returning it.
        List<Friend> requests = new ArrayList<>();
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(true);
        requests.add(request);
        when(friendRequestRepository.findAllByReceiverIdAndStatus(receiver.getId(), true)).thenReturn(requests);
        Assert.assertTrue(friendRequestService.findAllFriendsOfUser(receiver.getId()).contains(request));
    }

    @Test
    public void findAllOutGoingRequestsReturnsListOfRequests(){
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(false);
        when(friendRequestRepository.findAllBySenderIdAndStatus(sender.getId(), false)).thenReturn(List.of(request));
        Assert.assertTrue(friendRequestService.findAllOutgoingRequests(sender.getId()).contains(request));
    }

    @Test
    public void findAllIncomingRequestsReturnsListOfRequests(){
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(false);
        when(friendRequestRepository.findAllByReceiverIdAndStatus(receiver.getId(), false)).thenReturn(List.of(request));
        Assert.assertTrue(friendRequestService.findAllIncomingRequests(receiver.getId()).contains(request));
    }

    @Test
    public void checkIfFriendsReturnsFalseWhenUsersAreNotFriends(){
        when(friendRequestRepository.findBySenderAndReceiver(sender, receiver)).thenReturn(null);
        when(friendRequestRepository.findBySenderAndReceiver(receiver, sender)).thenReturn(null);
        Assert.assertFalse(friendRequestService.checkIfUsersAreFriends(sender, receiver));
    }

    @Test
    public void checkIfFriendsReturnsTrueWhenUsersAreFriends(){
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(true);
        when(friendRequestRepository.findBySenderAndReceiver(sender, receiver)).thenReturn(request);
        when(friendRequestRepository.findBySenderAndReceiver(receiver, sender)).thenReturn(null);
        Assert.assertTrue(friendRequestService.checkIfUsersAreFriends(sender, receiver));
    }

    @Test
    public void checkIfRequestSentReturnsFalseWhenRequestDoesNotExist(){
        when(friendRequestRepository.findAllBySenderIdAndStatus(sender.getId(), false)).thenReturn(List.of());
        Assert.assertFalse(friendRequestService.checkIfRequestSent(sender.getId(), receiver.getId()));
    }

    @Test
    public void checkIfRequestSentReturnsTrueWhenRequestExists(){
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(false);
        when(friendRequestRepository.findAllBySenderIdAndStatus(sender.getId(), false)).thenReturn(List.of(request));
        Assert.assertTrue(friendRequestService.checkIfRequestSent(sender.getId(), receiver.getId()));
    }

    @Test
    public void checkIfRequestPendingReturnsFalseWhenRequestDoesNotExist(){
        when(friendRequestRepository.findAllByReceiverIdAndStatus(receiver.getId(), false)).thenReturn(List.of());
        Assert.assertFalse(friendRequestService.checkIfRequestSent(receiver.getId(), sender.getId()));
    }

    @Test
    public void checkIfRequestPendingReturnsTrueWhenRequestExists(){
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(false);
        when(friendRequestRepository.findAllByReceiverIdAndStatus(receiver.getId(), false)).thenReturn(List.of(request));
        Assert.assertTrue(friendRequestService.checkIfRequestPending(receiver.getId(), sender.getId()));
    }

    @Test
    public void deleteBySenderAndReceiverDeletesUser(){
        Friend request = new Friend();
        request.setId(1);
        request.setSender(sender);
        request.setReceiver(receiver);
        Assert.assertEquals("Friend request deleted", friendRequestService.deleteBySenderAndReceiver(sender, receiver));
    }
}

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FriendRequest from './friendRequest';
import '../css/friendList.css';

const FriendList = () => {
    const navigate = useNavigate();
    const[friends, setFriends] = useState([]);
    const[unfilteredFriends, setUnfilteredFriends] = useState([]);
    const[outgoingRequests, setOutgoingRequests] = useState([]);
    const[incomingRequests, setIncomingRequests] = useState([]);
    const[searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchFriends();
        fetchOutgoingRequests();
        fetchIncomingRequests();
    }, []);

    useEffect(() => {
        searchFriends();
    }, [searchInput]);

    const fetchFriends = async () => {
        try{
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const response = await axios.get(`http://localhost:8080/friend-requests/getfriendsbyuserid/${currentUser.data.id}`);

            let friendList = [];
            response.data.forEach((request) => {
                var friend;
                // the logged in user may be the receiver or the sender, so we want to make sure we only display other users (i.e. not the logged in user.)
                if(request.receiver.email === localStorage.getItem('loggedInUser')){
                    friend = request.sender;
                } else {
                    friend = request.receiver;
                }
                const friendData = {
                    email: friend.email,
                    firstName: friend.firstName,
                    lastName: friend.lastName
                };
                friendList.push(friendData);
            });
            setFriends(friendList);
            setUnfilteredFriends(friendList);
        } catch (error) {
            console.log(error)
            alert("An error occured, please try again.");
        }
    }

    const fetchOutgoingRequests = async () => {
        try{
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const response = await axios.get(`http://localhost:8080/friend-requests/getoutgoingrequests/${currentUser.data.id}`);
            
            let outgoingList = [];
            response.data.forEach((request) => {
                const friendData = {
                    email: request.receiver.email,
                    firstName: request.receiver.firstName,
                    lastName: request.receiver.lastName
                }
                outgoingList.push(friendData);
            });
            setOutgoingRequests(outgoingList);
        } catch (error) {
            console.log(error)
            alert("An error occured, please try again.");
        }
    }

    const fetchIncomingRequests = async () => {
        try{
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const response = await axios.get(`http://localhost:8080/friend-requests/getincomingrequests/${currentUser.data.id}`);
            let incomingList = [];
            response.data.forEach((request) => {
                const friendData = {
                    email: request.sender.email,
                    firstName: request.sender.firstName,
                    lastName: request.sender.lastName
                }
                incomingList.push(friendData);
            });
            setIncomingRequests(incomingList);
        } catch (error) {
            console.log(error)
            alert("An error occured, please try again.");
        }
    }

    const searchFriends = async () => {
        if(searchInput === ''){
            setFriends(unfilteredFriends);
        }
        setFriends(unfilteredFriends.filter((friend) => {
            var fullName = friend.firstName + ' ' + friend.lastName;
            return fullName.toLowerCase().includes(searchInput.toLowerCase());
        }));
    }
 
    return (
        <div className='friendsList'>
            <div id="friends" className='friendWrapper'>
                <div id="friendsHeader">
                    <h2>My Friends</h2>
                    <input className='searchBar' type='search' placeholder='Search Friends' onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
                </div>
                {friends.length !== 0 ? (
                friends.map((friend, index) =>
                    <div className="friendProfile" key={index}>
                        <p className="friendProfile" onClick={() => navigate(`/profile/${friend.email}`)}>{ friend.firstName } { friend.lastName}</p>
                        <FriendRequest userEmail={friend.email}/>
                    </div>    
                )) : (
                    <p>No friends at the moment, use the search bar at the top of the page to find other users!</p>
                )}
            </div>
            <div id='friendRequestContainer'>
                <h2>Friend Requests</h2>
                <div id="outgoing" className='friendWrapper'>
                    <h3>Outgoing Requests</h3>
                    {outgoingRequests.length !== 0 ? (
                    outgoingRequests.map((request, index) =>
                        <div className='requestEntry' key={index}>
                            <p className="friendProfile" onClick={() => navigate(`/profile/${request.email}`)}>{ request.firstName } { request.lastName}</p>
                            <FriendRequest userEmail={request.email}/>
                        </div>    
                    )) : (
                        <p>No Outgoing Requests...</p>
                    )}
                </div>
                <div id="incoming" className='friendWrapper'>
                    <h3>Incoming Requests</h3>
                    {incomingRequests.length !== 0 ? (
                    incomingRequests.map((request, index) =>
                        <div className='requestEntry' key={index}>
                            <p className="friendProfile" onClick={() => navigate(`/profile/${request.email}`)}>{ request.firstName } { request.lastName}</p>
                            <FriendRequest userEmail={request.email}/>
                        </div>    
                    )) : (
                        <p>No Incoming Requests...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FriendList;
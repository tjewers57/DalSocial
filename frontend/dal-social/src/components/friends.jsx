
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/friends.css'; // Assuming this is your CSS file

function FriendListComponent() {
    const { friend } = useParams(); // Assuming this is used for something specific in your app
    const [friends, setFriends] = useState([]);
    const [bff,setBff]=useState([]);
    const [request,setRequest]=useState([]);
    const [user, setUser] = useState(null);
    const [senderId, setSenderId] = useState(null); // Initialize senderId as null initially


    useEffect(() => {

        fetchFriendData();
        fetchUsers();
        fetchProfile();
        fetchFriends();
        fetchFriendRequests();

    }, []);



    const fetchFriendData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/friend-requests/fetch');
            if (!response.data) {
                throw new Error('Failed to fetch friends');
            }
            setFriends(response.data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };



    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/fetch');
            if (!response.data) {
                throw new Error('Failed to fetch users');
            }
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/getbyemail/${localStorage.getItem("loggedInUser")}`);
            if (!response.data) {
                throw new Error('Failed to fetch profile');
            }
            setSenderId(response.data.id); // Set senderId here
        } catch (error) {
            console.error('Error fetching profile:', error);
            alert('An error occurred while fetching profile.');
        }
    };


    const sendFriendRequest = async (senderId, receiverId) => {
        try {
            await axios.post(`http://localhost:8080/friend-requests/${senderId}/send-friend-request/${receiverId}`);
            alert('Friend request sent successfully!');
            // You may want to refresh friend list or take other actions upon success
        } catch (error) {
            alert('Failed to send friend request. Please try again.');
        }
    };


    const acceptFriendRequest = async (id) => {
        try {
            await axios.post(`http://localhost:8080/friend-requests/accept/${id}`);
            alert('Congratulations! you just made a new friend');
            // You may want to refresh friend list or take other actions upon success
        } catch (error) {
            alert('Failed to accept friend request');
        }
    };

    const rejectFriendRequest = async (id) => {
        try {
            await axios.post(`http://localhost:8080/friend-requests/reject/${id}`);
            alert('Friend request rejected successfully');
            // You may want to refresh friend list or take other actions upon success
        } catch (error) {
            alert('Failed to reject a friend request');
        }
    };



    const fetchFriends = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/friend-requests/getfriendsbyid/${senderId}/true`);
            if (!response.data) {
                throw new Error('Failed to fetch friends');
            }
            setBff(response.data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/friend-requests/getfriendsbyid/${senderId}/false`);
            if (!response.data) {
                throw new Error('Failed to fetch friend requests');
            }
            setRequest(response.data);
        } catch (error) {
            console.error('Error fetching friends requests:', error);
        }
    };




    return (
        <div className="container">

            <h4 className="Tag">Page under Development</h4>

            <h2>Here's my Friend list for {senderId}</h2>
            {bff ? (
                bff.map((res, index) => (
                    <div key={index} className="Container">
                        <p>{res.sender.firstName} {res.sender.lastName}</p>

                    </div>
                ))
            ) : (
                <p>Loading users...</p>
            )}


            <div>
                <h2>Recommendation to make more friends </h2>
                {user ? (
                    user.map((res, index) => (
                        <div key={index} className="Container">
                            <p>{res.firstName} {res.lastName}</p>
                            <button onClick={() => sendFriendRequest(senderId, res.id)}>+</button>
                        </div>
                    ))
                ) : (
                    <p>Loading users...</p>
                )}


            </div>


            <div>
                <h2>Pending friend Request</h2>

                {request ? (
                    request.map((res, index) => (
                        <div key={index} className="Container">
                            <p>Name: {res.sender.firstName} {res.sender.lastName}</p>
                            <p>Email: {res.sender.email}</p>
                            <button onClick={() => acceptFriendRequest(res.id) }>Accept</button>
                            <button onClick={() => acceptFriendRequest(res.id)}>Reject</button>


                        </div>
                    ))
                ) : (
                    <p>Loading users...</p>
                )}


            </div>


        </div>
    );
}

export default FriendListComponent;

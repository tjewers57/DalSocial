 import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//import '../css/GetResume.css';

const GetQualifications = () => {
    const { friend } = useParams();
    const [user, setUser] = useState(null);


    const[senderId, setSenderId]= useState();
    const[receiverId, setReceiverId]= useState();



    const request ={
senderId,
receiverId,

    };

    useEffect(()  => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/fetch`);
                console.log(response);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, [friend]);




    const sendFriendRequest = async (senderId, receiverId) => {
        try {
            // Replace with your backend API endpoint to send friend request
            await axios.post(`http://localhost:8080/friend-requests/${senderId}/send-friend-request/${receiverId}`);
            alert('Friend request sent successfully!');
        } catch (error) {
            alert('Failed to send friend request. Please try again.');
        }
    };















    return (
        <div className="container">

            <h2 className="title">List of the users</h2>
            {user ? (
                user.map((res, index) => (
                    <div key={index} className="resume">
                        <p>{res.firstName + " " + res.lastName}
                                    <li key={user.id}>
                                        {user.username}
                                        <button onClick={() => sendFriendRequest(res.id, res.id)}>+</button>
                                    </li>

                        </p>


                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

 export default GetQualifications;

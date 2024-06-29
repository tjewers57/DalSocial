 import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import localStorage from './protectedRoute'
import axios from 'axios';
//import '../css/GetResume.css';

const GetQualifications = () => {
    const { friend } = useParams();
    const { user1 } = useParams();

    const { email } = useParams();
    const[senderId, setSenderId]= useState('');
    const [user, setUser] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);








    const request ={


       senderId,
        email

    };


    useEffect(() => {

        fetchProfile();
    }, [])


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

    /**
     useEffect(()  => {
        const fetchLoggedInUser = async () => {

            localStorage.setItem('loggedInUser', email);



               const loggedInUser = await axios.get('http://localhost:8080/users/getbyemail/' +  email);
if(loggedInUser.data=''){
                console.log(loggedInUser);
                setLoggedUser(loggedInUser.data)
             //  setSenderId(loggedUser.data.id);

            }
             else {
                console.error('Error fetching users', error);
            }
        };

        fetchLoggedInUser();
    }, [user1]);    **/


    const fetchProfile = async () => {
        var returnUser;
        try {
            const response = await axios.get('http://localhost:8080/users/getbyemail/' +  localStorage.getItem("loggedInUser"));
            if (response.data =='') {
                alert("Error, invalid profile, redirecting to home.");

            } else {


                setSenderId(response.data.id)

                returnUser = response.data;
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
        return returnUser;

    }









    const sendFriendRequest = async (senderId, receiverId) => {
        try {
            //senderId= localStorage.getItem("LoggedInUser");
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
                                        <button onClick={() => sendFriendRequest(senderId, res.id)}>+</button>
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

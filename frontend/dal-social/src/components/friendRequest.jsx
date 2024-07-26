import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../css/friendRequest.css';

const FriendRequest = (userEmail) => {
    const[sent, setSent] = useState(false);
    const[pending, setPending] = useState(false);
    const[friends, setFriends] = useState(false);
    const[notFriends, setNotFriends] = useState(false);

    useEffect(() => {
        getStatus();
    }, [])

    const getStatus = async () => {
        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + userEmail.userEmail);
            if(currentUser.data === '' || targetUser.data === ''){
                alert("Error, invalid user.");
            }
            
            const requestStatus = await axios.get('http://localhost:8080/friend-requests/checkrequeststatus/' + currentUser.data.id + '/' + targetUser.data.id);
            switch(requestStatus.data){
                case "Users are friends":
                    setFriends(true);
                    break;
                case "Pending":
                    setSent(true);
                    break;
                case "Awaiting response":
                    setPending(true);
                    break;
                case "No request pending":
                    setNotFriends(true);
                    break;
                default:
                    console.log("Error, request status unrecognized.");
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const acceptRequest = async (e) => {
        e.preventDefault();

        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + userEmail.userEmail);
            if(currentUser.data === '' || targetUser.data === ''){
                alert("Error, invalid user.");
            }

            const requestResponse = await axios.post('http://localhost:8080/friend-requests/acceptbyusers/' + targetUser.data.id + '/' + currentUser.data.id);
            if(requestResponse.data === "Friend request accepted") {
                window.location.reload();
            } else {
                alert("Error accepting request");
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const deleteRequest = async (e) => {
        e.preventDefault();

        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + userEmail.userEmail);
            if(currentUser.data === '' || targetUser.data === ''){
                alert("Error, invalid user.");
            }

            const requestResponse = await axios.delete('http://localhost:8080/friend-requests/deletebyusers/' + currentUser.data.id + '/' + targetUser.data.id);
            if(requestResponse.data === "Friend request deleted"){
                window.location.reload();
            } else {
                alert("Error handling request.");
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const sendRequest = async (e) => {
        e.preventDefault();

        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + userEmail.userEmail);
            if(currentUser.data === '' || targetUser.data === ''){
                alert("Error, invalid user.");
            }

            const requestResponse = await axios.post('http://localhost:8080/friend-requests/' + currentUser.data.id + "/send-friend-request/" + targetUser.data.id);
            if(requestResponse.data === "Friend request sent"){
                window.location.reload();
            } else {
                alert("Error sending request.");
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    return (
        <div className='requestWrapper'>
            {sent && (
                <button className="friendRequestButton" onClick={deleteRequest}>Cancel Request</button>
            )}
            {pending && (
                <div className='requestChoice'>
                    <button className="friendRequestButton" onClick={acceptRequest}>Accept Request</button>
                    <button className="friendRequestButton" onClick={deleteRequest}>Reject Request</button>
                </div>
            )}
            {friends && (
                <button className="friendRequestButton" onClick={deleteRequest}>Unfriend</button>
            )}
            {notFriends && (
                <button className="friendRequestButton" onClick={sendRequest}>Add Friend</button>
            )}
        </div>
    );
}

export default FriendRequest;
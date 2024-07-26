import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Blocked = (userEmail) => {
    const[isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        getStatus();
    }, [])

    const getStatus = async () => {
        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + userEmail.userEmail);
            if(currentUser.data == '' || targetUser.data == ''){
                alert("Error, invalid user.");
            }
            
            //this will grab the status of the relationship between the two users
            const blockStatus = await axios.get('http://localhost:8080/block/get/' + currentUser.data.id + '/' + targetUser.data.id);
            if(blockStatus.data){
                setIsBlocked(true);
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const blockUser = async () => {
        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + userEmail.userEmail);
            if(currentUser.data == '' || targetUser.data == ''){
                alert("Error, invalid user.");
            }

            //this will modify the binary value of blocked for the target user
            //const requestStatus = await axios.get();
        }
        catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const unblockUser = async () => {
        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + userEmail.userEmail);
            if(currentUser.data == '' || targetUser.data == ''){
                alert("Error, invalid user.");
            }

            //this will modify the binary value of blocked for the target user
            //const requestStatus = await axios.get();
        }
        catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    return(
        <div>
            {isBlocked && (
                <div>
                    <button onclick={unblockUser}>Unblock</button>
                    <h2>You cannot see this user's posts as you are blocked.</h2>
                    <p>Better luck next time, chum.</p>
                </div>
            )}

            {!isBlocked &&
                <button onclick={blockUser}>BLOCK</button>
            }

        </div>
    );
}
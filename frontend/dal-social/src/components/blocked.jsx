import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/blocked.css'

const Blocked = (targetEmail) => {
    const[isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        getStatus();
    }, [])

    const getStatus = async () => {
        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + targetEmail.targetEmail);
            if(currentUser.data == '' || targetUser.data == ''){
                alert("Error, invalid user.");
            }

            //this will grab the status of the relationship between the two users
            const blockStatus = await axios.get('http://localhost:8080/block/status/' + currentUser.data.id + '/' + targetUser.data.id);
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
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + targetEmail.targetEmail);
            if(currentUser.data == '' || targetUser.data == ''){
                alert("Error, invalid user.");
            }

            const formData = {
                userId: currentUser.data.id,
                targetId: targetUser.data.id
            }

            //this will add the target user to the list of blocked users
            const blockUserResponse = await axios.post('http://localhost:8080/block/save', formData);
            if(blockUserResponse.data){
                window.location.reload();
            }
            else{
                alert("Error handling request.");
            }

            const requestResponse = await axios.delete('http://localhost:8080/friend-requests/deletebyusers/' + currentUser.data.id + '/' + targetUser.data.id);
        }
        catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const unblockUser = async () => {
        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + targetEmail.targetEmail);
            if(currentUser.data == '' || targetUser.data == ''){
                alert("Error, invalid user.");
            }

            const block = await axios.get('http://localhost:8080/block/get/' + currentUser.data.id + '/' + targetUser.data.id);

            //this will delete the target user from the list of blocked users
            const unblockUserResponse = await axios.delete('http://localhost:8080/block/delete/' + block.data.id);
            if(unblockUserResponse.data){
                window.location.reload();
            }
            else{
                alert("Error handling request.");
            }
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
                    <button className="button-unblocked" onClick={unblockUser}>Unblock</button>
                </div>
            )}

            {!isBlocked &&
                <button className="button-blocked" onClick={blockUser}>BLOCK</button>
            }

        </div>
    );
}

export default Blocked;
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Status = () => {
    const[status, setStatus] = useState('');

    useEffect(() => {
        if(localStorage.getItem("userStatus")){
            document.querySelector("#selectStatus").value = localStorage.getItem("userStatus");
        }
    }, [])

    useEffect(() => {
        saveStatus();
        statusChange();
    }, [status]);

    const saveStatus = () => {
        if(status){
            localStorage.setItem("userStatus", status);
        } else {
            localStorage.setItem("userStatus", localStorage.getItem("userStatus"));
        }
    }

    const statusChange = async () => {
        try {
            const user = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const profile = await axios.get('http://localhost:8080/profiles/getbyuser/' + user.data.id);

            var returnStatus;
            switch(status) {
                case 'online':
                    returnStatus = "STATUS_ONLINE";
                    break;
                case 'away':
                    returnStatus = "STATUS_AWAY";
                    break;
                case 'busy':
                    returnStatus = "STATUS_BUSY";
                    break;
                case 'invisible':
                    returnStatus = "STATUS_INVISIBLE";
                    break;
                default:
                    console.log("Error, status not recognized.");
            }

            const data = {
                id: profile.data.id,
                title: profile.data.title,
                bio: profile.data.bio,
                status: returnStatus
            }

            try {
                const response = await axios.put('http://localhost:8080/profiles/update', data);
            } catch (error) {
                console.log(error);
                alert("An error occured, please try again.");
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }
    return (
        <form id="statusForm">
            <select id="selectStatus" name="selectStatus" onChange={(e) => setStatus(e.target.value)} required>
                <option value="">Select Status</option>
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="busy">Busy</option>
                <option value="invisible">Invisible</option>
            </select>
        </form>
    );
}

export default Status;
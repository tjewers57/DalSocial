import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/deleteUser.css';

const DeleteUser = () => {

    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const user = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const response = await axios.delete('http://localhost:8080/users/delete/' + user.data.id);
            if(response.data === "User deleted successfully"){
                alert("User deleted successfully");
                localStorage.removeItem('loggedInUser');
                navigate("/signup");
            } else {
                alert("An error occured, please try again later");
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const confirmDelete = (e) => {
        e.preventDefault();

        var deleteWrapper = document.querySelector("#deleteWrapper");
        var deleteLabel = document.createElement('p');
        deleteLabel.innerText = "Are you sure?";
        var confirmDelete = document.createElement("button");
        confirmDelete.innerText = "Confirm Delete";
        var cancelDelete = document.createElement("button");
        cancelDelete.innerText = "Cancel";
        confirmDelete.setAttribute("class", "deleteButton");
        cancelDelete.setAttribute("class", "deleteButton");

        confirmDelete.addEventListener('click', handleDelete);
        cancelDelete.addEventListener('click', () => {
            deleteWrapper.removeChild(deleteLabel);
            deleteWrapper.removeChild(confirmDelete);
            deleteWrapper.removeChild(cancelDelete);
        });

        deleteWrapper.appendChild(deleteLabel);
        deleteWrapper.appendChild(confirmDelete);
        deleteWrapper.appendChild(cancelDelete);
    }

    return (
        <div id="deleteWrapper">
            <button className="deleteButton" onClick={confirmDelete}>Delete Account</button>
        </div>
    );
}

export default DeleteUser;
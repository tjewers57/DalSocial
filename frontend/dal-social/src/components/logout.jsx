import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/feed.css';

const Logout = () => {

    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('loggedInUser');
        navigate("/login");
    }

    return (
        <button id="nav-button" onClick={logoutUser}>Logout</button>
    );
}

export default Logout;
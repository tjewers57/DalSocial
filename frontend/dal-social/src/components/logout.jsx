import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('loggedInUser');
        navigate("/login");
    }

    return (
        <button id="logoutButton" onClick={logoutUser}>Logout</button>
    );
}

export default Logout;
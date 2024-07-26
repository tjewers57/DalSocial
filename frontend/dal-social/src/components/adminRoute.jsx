import axios from 'axios';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const isAdmin = async () => {
        const currentUser = await axios.get(`http://localhost:8080/users/getbyemail/${localStorage.getItem('loggedInUser')}`);
        return currentUser.data.role === "ROLE_ADMIN";
    }

    return (
        (localStorage.getItem('loggedInUser') && isAdmin() == true) ? <Outlet/> : <Navigate to = "/feed"/>
    );
}

export default AdminRoute;
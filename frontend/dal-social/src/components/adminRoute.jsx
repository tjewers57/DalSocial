import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const[isAdmin, setIsAdmin] = useState(false);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        verifyAdminStatus();
    }, [])

    const verifyAdminStatus = async () => {
        const currentUser = await axios.get(`http://localhost:8080/users/getbyemail/${localStorage.getItem('loggedInUser')}`);
        if(currentUser.data.role == "ROLE_ADMIN"){
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
        setLoading(false);
    }

    return (
        (loading ? <div>Loading</div> : isAdmin ? <Outlet/> : <Navigate to = "/feed"/>)
    );
}

export default AdminRoute;
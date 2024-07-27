import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios';
import '../css/admin.css';

function AdminListComponent() {
    const [users, setUsers] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchPendingUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/fetch');
            if (!response.data) {
                throw new Error('Failed to fetch users');
            }
            // Filter out users with the role 'ROLE_ADMIN'
            const filteredUsers = response.data.filter(user => user.role !== 'ROLE_ADMIN' & user.status!=="PENDING");
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchPendingUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/fetchPending');
            setPendingUsers(response.data);
        } catch (error) {
            console.error('Error fetching pending users:', error);
        }
    };

    const deleteUser = async (deleteId) => {
        try {
            await axios.delete(`http://localhost:8080/users/delete/${deleteId}`);
            alert('User deleted successfully!');
        } catch (error) {
            alert('Failed to delete user');
        }
        fetchUsers();
    };

    const changeUserRole = async (userId) => {
        try {
            const user = await axios.get(`http://localhost:8080/users/get/${userId}`);
            user.data.role = "ROLE_ADMIN";
            await axios.put('http://localhost:8080/users/update', user.data);
            alert('User role changed successfully!');
        } catch (error) {
            alert('Failed to change the user role');
        }
        fetchUsers();
    };

    const approveUser = async (userId) => {
        try {
            await axios.put(`http://localhost:8080/admin/approveUser/${userId}`);
            alert('User approved successfully!');
            fetchPendingUsers();
        } catch (error) {
            alert('Failed to approve user');
        }

        fetchUsers();
    };

    const rejectUser = async (userId) => {
        try {
            await axios.put(`http://localhost:8080/admin/rejectUser/${userId}`);
            alert('User rejected and deleted successfully!');
            fetchPendingUsers();
        } catch (error) {
            alert('Failed to reject and delete user');
        }
    };

    return (
        <div className="container">
            <h1>Administration</h1>
            <div className='adminWrapper'>
                <h2>List of Users - <strong>take caution when making changes here.</strong></h2>
                {users.length !== 0 ? (
                    users.map((res, index) => (
                        <div key={index} className="Container">
                            <p>{res.firstName} {res.lastName} ({res.email})</p>
                            <button onClick={() => deleteUser(res.id)}>Delete User</button>
                            <button onClick={() => changeUserRole(res.id) } >Elevate to Administrator</button>
                        </div>
                    ))
                ) : (
                    <p>Loading users...</p>
                )}
            </div>
            <div className='adminWrapper'>
                <h2>Pending User Requests</h2>
                {pendingUsers.length !== 0 ? (
                    pendingUsers.map((res, index) => (
                        <div key={index} className="Container">
                            <p>{res.firstName} {res.lastName} ({res.email})</p>
                            <button onClick={() => approveUser(res.id)}>Approve</button>
                            <button onClick={() => rejectUser(res.id)}>Reject</button>
                        </div>
                    ))
                ) : (
                    <p>No pending users to approve...</p>
                )}
            </div>
        </div>
    );
}

export default AdminListComponent;

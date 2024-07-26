import React, { useState, useEffect } from 'react';
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
            const filteredUsers = response.data.filter(user => user.role !== 'ROLE_ADMIN' && user.status !== 'PENDING');
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
            fetchUsers();
        } catch (error) {
            alert('Failed to delete user');
        }
    };

    const changeUserRole = async (userId) => {
        try {
            await axios.put(`http://localhost:8080/admin/changeRole/${userId}`);
            alert('User role changed successfully!');
            fetchUsers();
        } catch (error) {
            alert('Failed to change the user role');
        }
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
            <div>
                <h2>List of Users</h2>
                {users.length ? (
                    users.map((res, index) => (
                        <div key={index} className="Container">
                            <p>{res.firstName} {res.lastName}</p>
                            <button onClick={() => deleteUser(res.id)}>Remove</button>
                            <button onClick={() => changeUserRole(res.id)}>Admin</button>
                        </div>
                    ))
                ) : (
                    <p>Loading users...</p>
                )}
            </div>
            <div>
                <h2>Pending User Requests</h2>
                {pendingUsers.length ? (
                    pendingUsers.map((res, index) => (
                        <div key={index} className="Container">
                            <p>{res.firstName} {res.lastName}</p>
                            <button onClick={() => approveUser(res.id)}>Approve</button>
                            <button onClick={() => rejectUser(res.id)}>Reject</button>
                        </div>
                    ))
                ) : (
                    <p>Loading pending users...</p>
                )}
            </div>
        </div>
    );
}

export default AdminListComponent;

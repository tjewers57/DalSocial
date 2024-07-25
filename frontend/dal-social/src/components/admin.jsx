
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/friends.css';

function AdminListComponent() {
    const { friend } = useParams();
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [deleteId, setDeleteId]=useState(null);


    useEffect(() => {
        fetchUsers();
    }, []);




    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/fetch');
            if (!response.data) {
                throw new Error('Failed to fetch users');
            }
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
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

            await axios.post(`http://localhost:8080/users/changeRole/${userId}`);
            alert('User role changed successfully!');

        } catch (error) {
            alert('Failed to change the user role');
        }
        fetchUsers();

    };



    return (
        <div className="container">

            <h4 className="Tag">Page under Development</h4>

            <h1>Administration  {senderId}</h1>



            <div>
                <h2>List of the users </h2>
                {user ? (
                    user.map((res, index) => (
                        <div key={index} className="Container">
                            <p>{res.firstName} {res.lastName}</p>
                            <button onClick={() => deleteUser(res.id)}>Remove</button>
                        </div>
                    ))
                ) : (
                    <p>Loading users...</p>
                )}


            </div>
        </div>
    );
}

export default AdminListComponent;

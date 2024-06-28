import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/DeleteAccount.css';

const DeleteAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await axios.delete("http://localhost:8080/users/delete", {
                params: {
                    email: email,
                    password: password
                }
            });
            alert(response.data);
            if (response.data === "User deleted successfully") {
                localStorage.removeItem('loggedInUser');
                navigate('/signup');
            }
        } catch (error) {
            console.error('There was an error deleting the account', error);
            alert('There was an error deleting the account');
        }
    };

    return (
        <div className='basicWrapper'>
            <h1>Delete Account</h1>
            <p>Enter your email and password to delete your account:</p>
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button onClick={handleDelete}>Delete My Account</button>
        </div>
    );
};

export default DeleteAccount;

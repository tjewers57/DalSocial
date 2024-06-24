import React, { useState } from 'react';
import axios from 'axios';
import '../css/signup.css';

const SignUp = () => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const role = "ROLE_USER";

    const verifyFields = async (event) => {
        event.preventDefault();

        if(!firstName || !lastName || !email || !password){
            alert("Please fill in all fields.");
            return;
        }

        const formData = {
            firstName,
            lastName,
            email,
            password,
            role
        };
    
        try {
            const response = await axios.post('http://localhost:8080/users/save', formData);
            alert(response.data);
        } catch (error) {
            console.log(error)
            alert("An error occured, please try again.");
        }
    }

    return (
        <div>
            <h2>Register for an account.</h2>
            <form id="signup" onSubmit={verifyFields}>
                <input type='text' name='firstName' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} required/>
                <input type='text' name='lastName' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} required/>
                <input type='text' name='email' placeholder='Dalhousie Email' onChange={(e) => setEmail(e.target.value)} required/>
                <label form='password'>Password must contain at least 1 uppercase and 1 lowercase character, 1 number and 1 special character.</label>
                <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                <button type='submit'>Signup</button>
            </form>
        </div>
    );

}

export default SignUp;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/signup.css';

const SignUp = () => {

    const navigate = useNavigate();

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[securityQuestion, setSecurityQuestion] = useState('');
    const[securityAnswer, setSecurityAnswer] = useState('');
    const role = "ROLE_USER";

    const verifyFields = async (event) => {
        event.preventDefault();

        if(!firstName || !lastName || !email || !password || !securityQuestion || !securityAnswer){
            alert("Please fill in all fields.");
            return;
        }

        const formData = {
            firstName,
            lastName,
            email,
            password,
            securityQuestion,
            securityAnswer,
            role
        };

        try {
            const response = await axios.post('http://localhost:8080/users/save', formData);
            alert(response.data);
            if(response.data === "User created successfully. Awaiting approval.") {
                navigate('/login'); // Redirect to login page
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred, please try again.");
        }
    }

    const questionChange = (e) => {
        var select = e.target;
        setSecurityQuestion(select.options[select.selectedIndex].text);
    }

    return (
        <div className='accountWrapper'>
            <h2>Register for an account.</h2>
            <form id="signup" onSubmit={verifyFields}>
                <input type='text' name='firstName' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} required/>
                <input type='text' name='lastName' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} required/>
                <input type='text' name='email' placeholder='Dalhousie Email' onChange={(e) => setEmail(e.target.value)} required/>
                <label htmlFor='password'>Password must contain at least 1 uppercase and 1 lowercase character, 1 number and 1 special character.</label>
                <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                <label htmlFor='securityQuestion'>Security Question (Required for changing your password later)</label>
                <select name='securityQuestion' onChange={questionChange} required>
                    <option value="">Select Question</option>
                    <option value="firstPet">What is the name of your first pet?</option>
                    <option value="childhoodFriend">What is the name of your childhood best friend?</option>
                    <option value="city">What is the name of the city you grew up in?</option>
                </select>
                <input type='text' name='answer' placeholder='Answer' onChange={(e) => setSecurityAnswer(e.target.value)} required/>
                <button type='submit'>Signup</button>
            </form>
            <p>
                Already have an account? <br/>
                <span>
                    <Link to="/login">
                        Login
                    </Link>
                </span>
            </p>
        </div>
    );

}

export default SignUp;
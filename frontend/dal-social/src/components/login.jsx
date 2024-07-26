import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/signup.css';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {
            const response = await axios.post("http://localhost:8080/users/auth", loginData);

            if (response.data === "User authenticated successfully") {
                localStorage.setItem('loggedInUser', email);

                const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
                const userRole = currentUser.data.role;

                if (userRole === "ROLE_USER") {
                    navigate('/feed');

                } else {
                    navigate('/admin');
                }
            } else {
                setErrMsg(response.data);
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred, please try again.");
        }
    };

    return (
        <div className='accountWrapper'>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} style={{color:"red"}}>{errMsg}</p>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type="text" id="email" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                <button>Sign In</button>
            </form>

            <div id="loginRedirects">
                <p>
                    Not registered? <br/>
                    <span>
                        <Link to="/signup">Sign Up</Link>
                    </span>
                </p>
                <p>
                    Forgot Password? <br/>
                    <span>
                        <Link to="/reset">Reset Password</Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;

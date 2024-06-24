import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

    }

    return (
        <div className='accountWrapper'>
            <p ref={errRef} className = {errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type="text" id="email" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
                <button>Sign In</button>
            </form>

            <p>
                Not registered?
                <span>
                    <Link to="/signup">
                        <a href="#">Sign Up</a>
                    </Link>
                </span>
            </p>
        </div>
    );
}

export default Login;
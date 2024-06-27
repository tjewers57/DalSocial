import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/signup.css';

const ResetPassword  = () => {
    const navigate = useNavigate();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [allowReset, setAllowReset] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [email]);

    const checkEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:8080/users/getbyemail/' + email);
            if(response.data == ''){
                setErrMsg("An account with this email was not found.");
            }
            else{
                setSecurityQuestion(response.data.securityQuestion);
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const checkQuestion = async (e) => {
        e.preventDefault();

        const response = await axios.get('http://localhost:8080/users/checkanswer/' + email + '/' + securityAnswer);

        if(response.data){
            setAllowReset(true);
        }
        else{
            setErrMsg("Sorry, that answer is incorrect.");
        }
    }

    const handleReset = async (e) => {
        e.preventDefault();

        if(password != confirmPassword){
            setErrMsg("Two passwords do not match.");
        } else {
            const user = await axios.get('http://localhost:8080/users/getbyemail/' + email);
            if(user.data != ''){
                user.data.password = password;
                const update = await axios.put('http://localhost:8080/users/update', user.data);
                if(update.data === "User successfully updated"){
                    alert("Password reset successfully!");
                    navigate("/login");

                } else {
                    setErrMsg(update.data);
                }
            }
        }
    }

    return (
        <div className='accountWrapper'> 
            <h2>Reset Password</h2>
            <form onSubmit={checkEmail}>
                <label htmlFor='email'>Enter your email address.</label>
                <input type='text' name='email' autoComplete="off" onChange={(e) => setEmail(e.target.value)} required/>
                <button>Submit</button>
            </form>
            {securityQuestion != '' && (
                <>
                    <form onSubmit={checkQuestion}>
                        <p>{ securityQuestion }</p>
                        <label htmlFor='answer'>Enter the answer to your security question.</label>
                        <input type='text' name='answer' autoComplete="off" onChange={(e) => setSecurityAnswer(e.target.value)} required/>
                        <button>Submit</button>
                    </form>
                </>
            )}
            {allowReset && (
                <>
                    <form onSubmit={handleReset}>
                        <label htmlFor = 'newPassword'>
                            Enter your new password. <br/>
                            Password must contain at least 1 uppercase and 1 lowercase character, 1 number and 1 special character.
                        </label>
                        <input type='password' name='newPassword' autoComplete="off" onChange={(e) => setPassword(e.target.value)} required/>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' name='confirmPassword' autoComplete="off" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        <button>Reset</button>
                    </form>
                </>
            )}
            <p ref={errRef} className = {errMsg ? "errMsg" : "offscreen"} style={{color:"red"}}>{errMsg}</p>
        </div>
    );
}

export default ResetPassword; 
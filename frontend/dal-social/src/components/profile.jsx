
import React, { useState } from 'react';
import axios from 'axios';
import '../css/profile.css';


const CreateProfile = () => {
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [bio,  setBio] = useState('');
    const [status,  setStatus] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!sex || !age || !email || !bio ) {
            alert('Please fill in all required fields');
            return;
        }



        const formData = {
              sex,
              age,
            email,
            bio,
            status,

        };

        try {
            const response = await axios.post('http://localhost:8080/', formData);
            console.log(response.data);
            alert('Profile created successfully');
        } catch (error) {
            console.error(error);
            alert('Sorry, An error occurred');
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className="con">
            <h2 style={{ marginBottom: '20px', color:"green" }}>Create Profile</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" name="firstName" placeholder="First Name" onChange={(e) => setSex(e.target.value)} className="input-field" />
                <input type="text" name="lastName" placeholder="Last Name" onChange={(e) => setAge(e.target.value)} className="input-field" />
                <input type="text" name="email" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} className="input-field" />
                <input type="text" name=" Bio" placeholder="Bio" onChange={(e) => setBio(e.target.value)} className="input-field" />

                <select name="status" onChange={handleStatusChange} className="select-field">
                    <option value="">Select Status</option>
                    <option value="Avilable">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="Away">Away</option>
                    <option value="Travel">Travelling</option>

                </select>

                <button type="submit" className="submit-button">Submit</button>


            </form>


        </div>
    );
};

export default CreateProfile;

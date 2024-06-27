import React, { useRef, useState, useEffect } from 'react';
import '../css/feed.css';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const Feed = () => {
    const userRef = useRef();
    const errRef = useRef();

    const[content, setContent] = useState('');
    const[postDate, setPostDate] = useState('');
    const[title, setTitle] = useState('');
    const userId = '';

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            content,
            postDate,
            title,
            userId
        }

        try{
            const email = localStorage.getItem('loggedInUser');
            const user = axios.get("http://localhost:8080/users/getbyemail/" + email);
            userId = user.data.id;

            //add storing into the database
            //const response = await axios.post("http://localhost:8080:users/save")
        }
        catch(error) {
            console.error("There was an erroring fetching the user id", error);
            alert("There was an erroring fetching the user id");
        }



    }

    return (
        <div className='basicWrapper'>
            <h1>DALSOCIAL</h1>
            <h2>DALHOUSIE SOCIAL NETWORK</h2>

            <nav className='nav'>
                <Link to="/signup" className='nav-item'>
                    <a href="#">Sign Up</a>
                </Link>
                <p className='nav-item'>|</p>
                <Link to="/login" className='nav-item'>
                    <a href="#">Login</a>
                </Link>
                
            </nav>
            
            <p>This is the feed page (in development)</p>

            <form onSubmit={handleSubmit}>
                <label>Create your post!</label>
                <input type='text' placeholder='Title' id='input-title' onChange={(e) => setTitle(e.target.value)} required></input>
                <textarea type="text" placeholder='Text' id='input-text' rows='8' onChange={(e) => setContent(e.target.value)} required></textarea>
                <button type='submit'>Post</button>
            </form>

        </div>
    );
}

export default Feed;
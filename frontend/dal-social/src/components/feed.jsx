import React, { useRef, useState, useEffect } from 'react';
import '../css/feed.css';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import Logout from './logout.jsx';

const Feed = () => {
    const userRef = useRef();
    const errRef = useRef();

    const[content, setContent] = useState('');
    const[title, setTitle] = useState('');
    const[user_Id, setUserId] = useState('');

    const[isExpanded, setIsExpanded] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            content,
            title,
            user_Id
        }

        try{
            const email = localStorage.getItem('loggedInUser');
            const user = await axios.get("http://localhost:8080/users/getbyemail/" + email);
            setUserId(user.data.id);
        }
        catch(error) {
            console.error("There was an error fetching the user id", error);
            alert("There was an erroring fetching the user id");
        }

        try{
            //add storing into the database
            const response = await axios.post("http://localhost:8080/posts/save", formData);
            alert(response.data);
        }
        catch(error){
            console.error("There was an error saving the post", error);
            alert("There was an error saving the post");
        }
    }

    const toggleVisible = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='basicWrapper'>
            <h1>DALSOCIAL</h1>
            <h2>DALHOUSIE SOCIAL NETWORK</h2>

            <nav className='nav'>
                <button aria-expanded={isExpanded} id='nav-button' onClick={toggleVisible}>Create Post</button>
                <Logout className='logout'/>
            </nav>
            
            <p>This is the feed page (in development)</p>

            <div id={isExpanded ? 'visible' : 'hidden'} className='post'>
                <form onSubmit={handleSubmit}>
                    <label>Create your post!</label>
                    <input type='text' placeholder='Title' id='input-title' onChange={(e) => setTitle(e.target.value)} required></input>
                    <textarea type="text" placeholder='Text' id='input-text' rows='8' onChange={(e) => setContent(e.target.value)} required></textarea>
                    <button type='submit' id='post-button'>Post</button>
                </form>
            </div>

        </div>
    );
}

export default Feed;
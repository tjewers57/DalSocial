import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/post.css';
import {useNavigate} from 'react-router-dom';

const Post = (post) => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const user = await axios.get('http://localhost:8080/users/get/' + post.post.userId);
            setFirstName(user.data.firstName);
            setLastName(user.data.lastName);
            setEmail(user.data.email);
        } catch (error) {
            console.log(error)
            alert("An error occured, please try again.");
        }

    }

    return (
        <div className='postTemplate'>
            <h2 className='post-title'>{post.post.title}</h2>
            <pre className='post-content'>
                {post.post.content}
            </pre>
            <p className='post-date'>
                Posted: <strong>{post.post.postDate}</strong> by <a className='post-profile' onClick={() => navigate('/profile/' + email)}>{firstName} {lastName}</a>
            </p>
        </div>
    );
}

export default Post;
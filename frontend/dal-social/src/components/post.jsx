import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Post = (post) => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');

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
            <h6>{post.post.title}</h6>
            <pre>
                {post.post.content}
            </pre>
            <p>
                Posted: <strong>{post.post.postDate}</strong> by <strong>{firstName} {lastName}</strong>
            </p>
        </div>
    );
}

export default Post;
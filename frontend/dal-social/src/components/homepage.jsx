
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';



const Homepage = () => {

    const [userData, setUserData] = useState({
        name: 'First_Name Last_Name',
        username: 'ac1234@dal.ca',
        bio: 'Student at Dal',
    });
    const [posts, setPosts] = useState([]);


    useEffect(() => {

        const fetchPosts = async () => {
            try {

                const response = await fetch('http://localhost:8080/users/posts');
                const data = await response.json();
                setPosts(data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1 style={{ marginBottom: '20px',textAlign:"center" }}>Welcome to Dalhousie Social Media App</h1>
            <nav>
                <a href="/">Home</a>{' '}
                <a href="/profile">Profile</a>{' '}

            </nav>
            <div className="content">
                <Feed posts={posts} />
                <Profile userData={userData} />
            </div>
        </div>
    );
};


const Feed = ({ posts }) => {
    return (
        <div>
            <h2>Feed</h2>
            {posts.map(post => (
                <Post key={post.id} title={post.title} body={post.body} />
            ))}
        </div>
    );
};

// Profile component to display user information
const Profile = ({ userData }) => {
    return (
        <div>
            <h2>Your Profile</h2>
            <p>Name: {userData.name}</p>
            <p>Username: @{userData.username}</p>
            <p>Bio: {userData.bio}</p>
        </div>
    );
};

// Post component to display individual post
const Post = ({ title, body }) => {
    return (
        <div className="post">
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    );
};

// Render the main App component
//ReactDOM.render(<App />, document.getElementById('root'));

export default Homepage;

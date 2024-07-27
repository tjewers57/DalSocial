import React, { useState, useEffect } from 'react';
import '../css/feed.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from './logout.jsx';
import Post from './post.jsx';

const Feed = () => {
    const[content, setContent] = useState('');
    const[title, setTitle] = useState('');
    const[isExpanded, setIsExpanded] = useState(false);
    const[posts, setPosts] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const email = localStorage.getItem('loggedInUser');
                const user = await axios.get("http://localhost:8080/users/getbyemail/" + email);
                
                const friendsResponse = await axios.get(`http://localhost:8080/friend-requests/getfriendsbyuserid/${user.data.id}`);
                if(!friendsResponse){
                    throw new Error("Failed to grab userId");
                }
                const friendsData = friendsResponse['data'];
                
                let allPosts = [];
                
                for(let i = 0; i < friendsData.length; i++){
                    if(friendsData[i].sender.id !== user.data.id){
                        const postsResponse = await axios.get('http://localhost:8080/posts/fetch/' + friendsData[i].sender.id);
                        if(!postsResponse){
                            throw new Error("Failed to grab posts");
                        }
                        const postsData = postsResponse['data'];
                        allPosts = [...allPosts, ...postsData];
                    }
                }

                setPosts(allPosts);
            }
            catch(error){
                setError(error);
            }
            finally{
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if(loading){
        return <div>Loading...</div>;
    }

    if(error){
        return <div>Error: {error.message}</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const email = localStorage.getItem('loggedInUser');
            const user = await axios.get("http://localhost:8080/users/getbyemail/" + email);
            const formData = {
                content,
                title,
                userId: user.data.id
            }
            const response = await axios.post("http://localhost:8080/posts/save", formData);
            alert(response.data);
        }
        catch(error) {
            console.log(error);
            alert("An error occured, please try again.");
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
            </nav>
            <div id={isExpanded ? 'visible' : 'hidden'} className='post'>
                <form onSubmit={handleSubmit}>
                    <label>Create your post!</label>
                    <input type='text' placeholder='Title' id='input-title' onChange={(e) => setTitle(e.target.value)} required></input>
                    <textarea type="text" placeholder='Text' id='input-text' rows='8' onChange={(e) => setContent(e.target.value)} required></textarea>
                    <button type='submit' id='post-button'>Post</button>
                </form>
            </div>

            <div className='grid-containter'>
                {posts.map((post, index) => (
                    <div className='grid-item' key={index}>
                        <Post post={post}/>
                    </div>
                ))}
                
            </div>

        </div>
    );
}

export default Feed;
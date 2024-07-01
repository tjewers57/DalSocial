import React, { useRef, useState, useEffect } from 'react';
import '../css/feed.css';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import Logout from './logout.jsx';
import Post from './post.jsx';
import Friend from './friends';

const Feed = () => {
    const userRef = useRef();
    const errRef = useRef();

    const[content, setContent] = useState('');
    const[title, setTitle] = useState('');
    const[user_Id, setUserId] = useState('');

    const[isExpanded, setIsExpanded] = useState(false);
    const[email, setEmail] = useState('');

    const navigate = useNavigate();


    const[posts, setPosts] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const email = localStorage.getItem('loggedInUser');
                const user = await axios.get("http://localhost:8080/users/getbyemail/" + email);
                
                const friendsResponse = await axios.get('http://localhost:8080/friend-requests/getfriendsbyid/' + user.data.id + '/true');
                if(!friendsResponse){
                    throw new Error("Failed to grab userId");
                }
                const friendsData = friendsResponse['data'];
                console.log(friendsData);
                console.log(friendsData.length);
                
                let allPosts = [];
                
                for(let i = 0; i < friendsData.length; i++){
                    if(friendsData[i].sender.id != user.data.id){
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
            setUserId(user.data.id);
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
                <button id='nav-button' onClick={() => navigate('/profile/' + localStorage.getItem('loggedInUser'))}>Profile</button>
                <button aria-expanded={isExpanded} id='nav-button' onClick={toggleVisible}>Create Post</button>
                {/* <button id='nav-button' onClick={()=> navigate('/friends')}>Friends</button> */}
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
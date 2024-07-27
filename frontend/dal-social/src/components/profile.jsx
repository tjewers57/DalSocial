import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Status from './status';
import '../css/profile.css'
import Post from './post';
import DeleteUser from './deleteUser';
import FriendRequest from './friendRequest';
import Blocked from './blocked';

const Profile = () => {

    const navigate = useNavigate();

    const { email } = useParams();
    const[isBlocked, setIsBlocked] = useState(false);
    const[title, setTitle] = useState('');
    const[bio, setBio] = useState('');
    const[status, setStatus] = useState('');
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[posts, setPosts] = useState([]);

    useEffect(() => {
        getStatus();
        fetchUser();
        fetchProfile();
    }, [])

    const getStatus = async () => {
        try {
            const currentUser = await axios.get('http://localhost:8080/users/getbyemail/' + localStorage.getItem('loggedInUser'));
            const targetUser = await axios.get('http://localhost:8080/users/getbyemail/' + email);
            if(currentUser.data == '' || targetUser.data == ''){
                alert("Error, invalid user.");
            }

            //this will grab the status of the relationship between the two users
            const blockStatus = await axios.get('http://localhost:8080/block/status/' + targetUser.data.id + '/' + currentUser.data.id);
            if(blockStatus.data){
                setIsBlocked(true);
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const fetchUser = async () => {
        var returnUser;
        try {
            const response = await axios.get('http://localhost:8080/users/getbyemail/' + email);
            if(response.data == ''){
                alert("Error, invalid profile, redirecting to home.");
                navigate("/profile/" + localStorage.getItem("loggedInUser"));
            } else {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setPosts(response.data.posts);
                returnUser = response.data;
            }
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
        return returnUser;
    }

    const fetchProfile = async () => {
        var returnProfile;
        try {
            const user = await axios.get('http://localhost:8080/users/getbyemail/' + email);
            const profile = await axios.get('http://localhost:8080/profiles/getbyuser/' + user.data.id);
            setTitle(profile.data.title);
            setBio(profile.data.bio);
            switch(profile.data.status){
                case "STATUS_OFFLINE":
                    setStatus("Offline");
                    break;
                case "STATUS_ONLINE":
                    setStatus("Online");
                    break;
                case "STATUS_AWAY":
                    setStatus("Away");
                    break;
                case "STATUS_BUSY":
                    setStatus("Busy");
                    break;
                case "STATUS_INVISIBLE":
                    setStatus("Offline");
                    break;
            }
            returnProfile = profile.data;
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
        return returnProfile;
    }

    const editProfile = async (e) => {
        e.preventDefault();

        fetchProfile().then(p => {
            var editBio = document.createElement('section');
            editBio.setAttribute('class', "bio");

            var bioForm = document.createElement('form');
            var bioTitle = document.createElement('input');
            var bioContent = document.createElement('textarea');
            bioTitle.value = p.title;
            bioContent.value = p.bio;

            bioTitle.setAttribute('id', 'updateTitle');
            bioTitle.setAttribute('placeholder', "Give your bio a title!");
            bioContent.setAttribute('id', 'updateBio');
            bioContent.setAttribute('placeholder', "Tell everyone about yourself!");
            bioContent.setAttribute('rows', 25);
            bioContent.setAttribute('cols', 50);

            var bioSubmit = document.createElement('button');
            bioSubmit.innerHTML = "Submit Changes";
            
            editBio.append(bioForm);
            bioForm.append(bioTitle);
            bioForm.append(bioContent);
            bioForm.append(bioSubmit);

            bioForm.addEventListener('submit', saveChanges);

            var displayBio = document.querySelector(".bio");

            displayBio.replaceWith(editBio);
        });
    }

    const saveChanges = async (e) => {
        e.preventDefault();

        fetchUser().then(async u => {
            var title, bio;
            title = (document.querySelector("#updateTitle").value);
            bio = (document.querySelector("#updateBio").value);

            var displayBio = document.createElement('section');
            displayBio.setAttribute('class', "bio");
            
            var displayTitle = document.createElement('h4');
            displayTitle.innerHTML = title;
            
            var displayContent = document.createElement('p');
            displayContent.innerText = bio; 

            displayBio.append(displayTitle);
            displayBio.append(displayContent);

            try {
                const profile = await axios.get('http://localhost:8080/profiles/getbyuser/' + u.id);
                const data = {
                    id: profile.data.id,
                    title,
                    bio,
                    status: profile.data.status
                };
                const response = await axios.put('http://localhost:8080/profiles/update', data);
            } catch (error) {
                console.log(error);
                alert("An error occured, please try again.");
            }
            document.querySelector(".bio").replaceWith(displayBio);
        });
    }
 
    return (
        <div className='profileWrapper'>
            <section className='userInfo'>
                <section className='userInfo-section'>
                    <h4> {firstName} {lastName} </h4>
                    <p> {email} </p>
                    <p id="status"> {status} </p>
                    {email == localStorage.getItem("loggedInUser") && (
                        <button onClick={editProfile}>Edit</button>
                    )}
                    <div className='statusForm'>
                    {email == localStorage.getItem("loggedInUser") && (
                        <Status/>
                    )}
                    {email == localStorage.getItem("loggedInUser") && (
                        <DeleteUser/>
                    )}
                    {email != localStorage.getItem("loggedInUser") && (
                        <FriendRequest userEmail={email}/>
                    )}
                    </div>
                </section>
                <section>
                    <div>
                        {email != localStorage.getItem("loggedInUser") && (
                            <Blocked targetEmail={email}/>
                        )}
                    </div>
                </section>
            </section>
            <section className='bio'>
                <h4>{title}</h4>
                <pre>{bio}</pre>
            </section>

            <section className='posts'>
                <div>
                    {!isBlocked && (
                        <div>
                            <h3>Posts</h3>
                            <div className='postsContainer'>
                                { posts.length > 0 ? (
                                    posts.map((post, index) => (
                                        <div key={index} className='post'>
                                            <Post post={post}/>
                                        </div>
                                    ))
                                ) : (
                                    <p id="postPlaceholder">{firstName} currently does not have any posts.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {isBlocked && (
                        <div>
                            <h3>You cannot view this person's posts. As you have been blocked.</h3>
                        </div>
                    )}
                </div> 
            </section>
        </div>
    );
}

export default Profile;
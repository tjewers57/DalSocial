import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/userSearch.css';

const UserSearch = () => {

    const navigate = useNavigate();

    const[searchInput, setSearchInput] = useState('');
    const[users, setUsers] = useState([]);
    const[filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    useEffect(() => {
        searchUsers();
    }, [searchInput]);
    
    // fetch all users in the database.
    const fetchUsers = async () => {
        try{
            const users = await axios.get('http://localhost:8080/users/fetch');
            if(users.data === ''){
                alert("Error fetching search results, please try again.");
            }
            setUsers(users.data);
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    // search is separated from the initial fetch so that we are not calling the backend API everytime the input changes.
    const searchUsers = async () => {
        if(searchInput === ''){
            setFilteredUsers([]);
        }
        setFilteredUsers(users.filter((user) => {
            var fullName = user.firstName + ' ' + user.lastName;
            return fullName.toLowerCase().includes(searchInput.toLowerCase());
        }));
    }
    
    return (
        <div className='searchWrapper'>
            <input className='searchBar' type='search' placeholder='Search Users' onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
            <div className='searchResult'>
                {filteredUsers && (
                    filteredUsers.map((user, index) => 
                        <div key={index} className='searchItem' onClick={() => navigate(`/profile/${ user.email }`)}>
                            <p>{ user.firstName } { user.lastName } <br/> { user.email }</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default UserSearch;
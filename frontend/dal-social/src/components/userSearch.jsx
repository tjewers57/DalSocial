import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
    
    const fetchUsers = async () => {
        try{
            const users = await axios.get('http://localhost:8080/users/fetch');
            if(users.data == ''){
                alert("Error fetching search results, please try again.");
            }
            setUsers(users.data);
        } catch (error) {
            console.log(error);
            alert("An error occured, please try again.");
        }
    }

    const searchUsers = async () => {
        if(searchInput == ''){
            setFilteredUsers([]);
        }
        setFilteredUsers(users.filter((user) => {
            var fullName = user.firstName + ' ' + user.lastName;
            return fullName.toLowerCase().includes(searchInput.toLowerCase());
        }));
    }
    
    return (
        <div>
            <input type='search' placeholder='Search Users' onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
            {filteredUsers && (
                filteredUsers.map((user, index) => 
                    <div key={index} className='userResult' onClick={() => navigate(`/profile/${ user.email }`)}>
                        <p>{ user.firstName } { user.lastName }</p>
                        <p>{ user.email }</p>
                    </div>
                )
            )}
        </div>
    );
}

export default UserSearch;
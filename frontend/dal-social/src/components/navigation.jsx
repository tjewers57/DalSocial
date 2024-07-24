import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navigation.css';
import Logout from './logout';
import Status from './status';
import UserSearch from './userSearch';

const Navigation = () => {
    return (
        <div className='navbar'>
            <section className='navContainer'>
                <div className='navItem'>
                    <Link to="./feed">
                        <button>Home</button>
                    </Link>
                </div>
                <div className='navItem'>
                    <Link to={`./profile/${localStorage.getItem('loggedInUser')}`}>
                        <button>My Profile</button>
                    </Link>
                </div>
                <div className='navItem'>
                    <Link to="./friendlist">
                        <button>Friends</button>
                    </Link>
                </div>
                <div className='navItem'>
                    <Link>
                        <button>Groups</button>
                    </Link>
                </div>
            </section>
            <section className='navContainer'>
                <div className='navItem'>
                    <UserSearch/>
                </div>
                <div className='navItem'>
                    <Status/>
                </div>
                <div className='navItem'>
                    <Logout/>
                </div>
            </section>
        </div>
    );
}

export default Navigation;
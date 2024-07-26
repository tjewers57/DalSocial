import React from 'react';
import '../css/feed.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='basicWrapper'>
            <h1>DALSOCIAL</h1>
            <h2>DALHOUSIE SOCIAL NETWORK</h2>

            <nav className='nav'>
                <Link to="/signup" className='nav-item'>
                    <button>Signup</button>
                </Link>
                <Link to="/login" className='nav-item'>
                    <button>Login</button>
                </Link>
            </nav>
            
        </div>
    );
}

export default Home;
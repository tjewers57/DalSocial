import React, { useRef, useState, useEffect } from 'react';
import '../css/feed.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='basicWrapper'>
            <h1>DALSOCIAL</h1>
            <h2>DALHOUSIE SOCIAL NETWORK</h2>

            <nav className='nav'>
                <Link to="/signup" className='nav-item'>
                    <a href="#">Sign Up</a>
                </Link>
                <p className='nav-item'>|</p>
                <Link to="/login" className='nav-item'>
                    <a href="#">Login</a>
                </Link>
            </nav>
            
        </div>
    );
}

export default Home;
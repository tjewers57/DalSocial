import React from 'react';
import '../css/post.css';

const Post = ({ post, onLike, onDislike }) => {
    return (
        <div className='post'>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <div className='postActions'>
                <button onClick={onLike}>Like</button>
                <span>{post.likes}</span>
                <button onClick={onDislike}>Dislike</button>
                <span>{post.dislikes}</span>
            </div>
        </div>
    );
};

export default Post;
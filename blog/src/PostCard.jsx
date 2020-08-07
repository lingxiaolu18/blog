import React from 'react';

function PostCard({post}){
    return(
        <div className = 'posts-card'>
        <img src= {post.img} alt="Avatar"/>
            <div className = 'container'>
                <h4><b>{post.title}</b></h4>
                <p>Author:{post.username}</p>
                <p>Date:{post.timeStamp}</p>
            </div>
        </div>
    )
}


export default PostCard;
import React,{ useEffect, useState } from "react";
import {useParams} from 'react-router-dom'

function PostDetail(){
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [userPostCount, setUserPostCount] = useState({})
    const {id} = useParams()

    useEffect(()=>{
        fetch (`http://127.0.0.1:3001/posts/${id}`)
        .then(r => r.json())
        .then(post=>{setPost(post)
                    setComments(post.comments)
                    setUserPostCount(post.user)      
        })
    },[id])


    const {pictures, title, destination, visit_date, username, review, likes_count, comments_count } = post
    const {posts_count, hometown, avatar} = userPostCount
    
    return(
        <div className = "post-details">
            <img src={pictures} alt={destination}/>
            <h2>{title}</h2>
            <h3>{destination}</h3>
            <h3>Date of visit: {visit_date}</h3>
            <img className="avatar-in-postDetail"src={avatar} alt={username}/>
            <h3>{username} </h3>
            <span role="img" aria-label="hometown">🏡 {hometown}</span><br/>
            <span role="img" aria-label="contributions"> ✍🏻 {posts_count} Contributions</span>
            <p>{review}</p>
            <div className="likes-comments">
                <span>{likes_count} {likes_count > 1 ? "Likes" : "Like"}</span> <span>{comments_count} {comments_count > 1 ? "Comments" :  "Comment"}</span>
            </div>
            
        </div>
    )
}

export default PostDetail
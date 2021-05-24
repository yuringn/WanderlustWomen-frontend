import React,{ useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import CommentDetail from "./CommentDetail"
import CommentForm from "./CommentForm";

function PostDetail({currentUser}){
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [userPostCount, setUserPostCount] = useState({})
    const {id} = useParams()
    const [showComments, setShowComments] = useState(false)

    useEffect(() => {
        fetch (`http://127.0.0.1:3001/posts/${id}`)
        .then(r => r.json())
        .then(post => {
                    setPost(post)
                    setComments(post.comments)
                    setUserPostCount(post.user)      
        })
    },[id])

    //--- CRUD COMMENT ---

    const addNewComment = (newComment) => {
        const newCommentArr = [...comments, newComment]
        setComments(newCommentArr)
    }   

    const updateComment = (commentObj) => {
       const update =  comments.map(comment => {
           if (comment.id === commentObj.id){
               return commentObj
           }else return comment
       })
       setComments(update)
    }

    const deleteComment = (commentId) => {
        const removeComment = comments.filter(comment => comment.id !== commentId )
        setComments(removeComment)
    }
    //--- CRUD COMMENT ---

    const handleShowComments = () => setShowComments(show=>!show)
    
    const sortComments = [...comments].sort((a,b) => (b.id) - (a.id))
    const renderComment = sortComments.map(comment => 
        <CommentDetail key={comment.id} {...comment} currentUser={currentUser}
            updateComment = {updateComment} deleteComment = {deleteComment}
        />
    )
    

    const {pictures, title, destination, visit_date, review, likes_count} = post
    const {posts_count, hometown, avatar, username} = userPostCount
    
    return(
        <div className = "post-details">
            <img src={pictures} alt={destination}/>
            <h2>{title}</h2>
            <h3>{destination}</h3>
            <h3>Date of visit: {visit_date}</h3>
            <img className="avatar-in-postDetail"src={avatar} alt={username}/>
            <h3>{username} </h3>
            <span role="img" aria-label="hometown">🏡 {hometown}</span><br/>
            <span role="img" aria-label="contributions"> ✍🏻 {posts_count} {posts_count > 1 ? "Contributions" : "Contribution" } </span>
            <p>{review}</p>

            <div className="likes-comments">
                <button>{likes_count} {likes_count > 1 ? "Likes" : "Like"}</button>
                &nbsp;&nbsp;&nbsp;
                
                <button onClick={handleShowComments}>
                    {comments.length} {comments.length > 1 ? "Comments" :  "Comment"}
                </button>
                <CommentForm addNewComment={addNewComment} post={post} currentUser={currentUser} />
                {showComments ? renderComment : null}
            </div>
            
            {/* <div className="show-comment">

            </div> */}
        </div>
    )
}

export default PostDetail
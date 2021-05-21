import React,{ useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import CommentDetail from "./CommentDetail"

function PostDetail(){
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [userPostCount, setUserPostCount] = useState({})
    const {id} = useParams()
    const [showComments, setShowComments] = useState(false)

    useEffect(() => {
        fetch (`http://127.0.0.1:3001/posts/${id}`)
        .then(r => r.json())
        .then(post => {console.log(post.comments)
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
        console.log(commentId)
        const removeComment = comments.filter(comment => comment.id !== commentId )
        setComments(removeComment)
    }
    //--- CRUD COMMENT ---

    const handleShowComments = () => setShowComments(show=>!show)
    
    const renderComment = comments.map(comment => 
        <CommentDetail key={comment.id} {...comment}
            updateComment = {updateComment} deleteComment = {deleteComment}
        />
    )
    

    const {pictures, title, destination, visit_date, review, likes_count, comments_count } = post
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
                <span>{likes_count} {likes_count > 1 ? "Likes" : "Like"}</span>
                &nbsp;&nbsp;&nbsp;
                <span onClick={handleShowComments}>
                    {comments_count} {comments_count > 1 ? "Comments" :  "Comment"}
                    {showComments ? renderComment : null}
                </span>
            </div>
            
            {/* <div className="show-comment">

            </div> */}
        </div>
    )
}

export default PostDetail
import React,{ useEffect, useState } from "react";
import {useParams,useHistory} from 'react-router-dom'
import CommentDetail from "./CommentDetail"
import CommentForm from "./CommentForm";
import EditPostForm from "./EditPostForm"

function PostDetail({currentUser, deletePost}){
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [userPostCount, setUserPostCount] = useState({})
    const [currentLikes, setCurrentLikes] = useState([])
    const {id} = useParams()
    const history = useHistory()
    // const [showComments, setShowComments] = useState(false)

    // const [formData, setFormData] = useState({
    //     user_id: currentUser.id,
    //     country: "",
    //     title: "",
    //     visit_date: "",
    //     review: "",
    //     picture: ""
    // })

    useEffect(() => {
        fetch (`http://127.0.0.1:3003/posts/${id}`)
        .then(r => r.json())
        .then(post => {
                    setPost(post)
                    setComments(post.comments)
                    setUserPostCount(post.user)
                    setCurrentLikes(post.likes) 
                    // setFormData(post)     
        })
    },[id])

    
    // ---------- EDIT POST ---------- //

    // const editPost = (editPostObj) => {
    //     console.log( editPostObj)
    //     setPost(editPostObj)
    //   }

    // const [editPostForm, setEditPostForm] = useState(false)

    const handleEditPostForm = () => history.push(`/posts/${id}/edit`)

    // const handleChange = (e) => {
    //     const key = e.target.name
    //     setFormData({...formData, 
    //     [key]: e.target.value})
    // }

    // const handleEditPost = (e) => {
    //     e.preventDefault()

    //     fetch(`http://127.0.0.1:3003/posts/${id}`,{
    //         method:"PATCH",
    //         headers: {"Content-type":"application/json"},
    //         body: JSON.stringify(formData)
    //     })
    //     .then(r => r.json())
    //     .then(post => { console.log(post)
    //                     editPost(post)})
    //     setEditPostForm(false)  
    // }
    
    const handleDeletePost =()=>{
        fetch(`http://127.0.0.1:3003/posts/${id}`, {
            method:"DELETE"
        })
        deletePost(id)
        history.push("/posts")
    }
    // ---------- EDIT POST ---------- //

   
    // const addLike = (likeObj) => {
    //     console.log(likeObj)
    //     const newLike = [...currentLikes, likeObj]
    //     setCurrentLikes(newLike)
    // }

    // const deleteLike = (likeId) => {
    //     const removeLike = currentLikes.filter(like => like.id !== likeId)
    //     setCurrentLikes(removeLike)
    // }

    // const handleLike = () => {
    //     // let currentUserDidLike = currentLikes.filter(like => like.user_id === currentUser.Id)
    //     // if (currentUserDidLike) {
    //     //      let likeToBeRemove = currentUserDidLike.id
    //     //      deleteLike(likeToBeRemove)
    //     // }

    //     fetch("http://127.0.0.1:3003/likes", {
    //         method:"POST",
    //         headers:{"Content-type":"application/json"},
    //         body: JSON.stringify({user_id: currentUser.id, post_id: post.id})
    //     })
    //     .then(r => r.json())
    //     .then(like => {
    //                     addLike(like)
    //                     // setCurrentLikes(like => like + 1)
    //     })
    // }
    
    // ----------  HANDLE LIKE/UNLIKE ---------- //
    const addLike = () => {
        console.log("add Like is called")
        let like = {
            user_id: currentUser.id,
            post_id: post.id
        }
    
        fetch("http://127.0.0.1:3003/likes", {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(like)
            })
            .then(r => r.json())    
            .then(data=>{
                console.log(data)
                setCurrentLikes(data.post.likes)
            }       
)}

    const deleteLike = (likeId) => {
        console.log(likeId)
        const removeLike = currentLikes.filter(like => like.id !== likeId)
        setCurrentLikes(removeLike)
        fetch(`http://127.0.0.1:3003/likes/${likeId}`, {
                method:"DELETE",         
            })
    }

    const handleLike = () => {
        let currentUserDidLike = currentLikes.filter(like => like.user_id === currentUser.id);
        console.log("currentUserDidLike",currentUserDidLike)
        if (currentUserDidLike[0] !== undefined) {
            let likeToBeRemoved = currentUserDidLike[0].id;
            console.log(likeToBeRemoved)
            deleteLike(likeToBeRemoved);
        } else {
            addLike();
        }
    }

    // ----------  HANDLE LIKE/UNLIKE ---------- //
    

    // ----------  CRUD COMMENT ---------- //

    const addNewComment = (newComment) => {
        const newCommentArr = [...comments, newComment]
        setComments(newCommentArr)
    }   

    const editComment = (commentObj) => {
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

     // ----------  CRUD COMMENT ---------- //

    // const handleShowComments = () => setShowComments(show=>!show)
    
    const sortComments = [...comments].sort((a,b) => (b.id) - (a.id))
    const renderComment = sortComments.map(comment => 
        <CommentDetail key={comment.id} {...comment} currentUser={currentUser}
            editComment = {editComment} deleteComment = {deleteComment}
        />
    )
    
    const {picture, title, country, visit_date, review, user_id} = post
    const {posts_count, hometown, avatar, username, bio} = userPostCount
    
    return(
        <>
            {user_id === currentUser.id ?
            <div className="edit-delete-container">
                <i className="far fa-edit" onClick={handleEditPostForm}/>
                <i className="fas fa-trash-alt" onClick={handleDeletePost}/>
            </div> :null}
            <div className = "post-details-container">
                <div className="post-details">
                <img src={picture} alt={country}/>
                <button className="like-btn"onClick={handleLike}>{currentLikes.length} {currentLikes.length > 1 ? "Likes" : "Like"}</button>
                   
                

                {/* <div>
                {editPostForm ? (
                    <section className="all-form edit-post">
                        <form onSubmit={handleEditPost}>
                            <label className="all-form-label" htmlFor="country">Country: </label><br/>
                            <select className="all-form-input"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            >   
                                <option value="Select a Country">Select A Country</option>
                                <option value="France">France</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Italy">Italy</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Peru">Peru</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Spain">Spain</option>
                                <option value="Swiss">Swiss</option>
                                <option value="USA">USA</option>
                                <option value="Vietnam">Vietnam</option>
                                
                            </select>
                    
                        <br/>
                        
                            <label htmlFor="title">Title: </label><br/>
                            <input className="all-form-input" type="text" 
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Please include city or country in your title"
                                required
                            />
                        
                        <br/>
                    
                            <label htmlFor="visit_date">Visit Date: </label><br/>
                            <input className="all-form-input" type="date"
                                name="visit_date"
                                value={formData.visit_date}
                                min="01-01-2015" max ="12-31-2030"
                                onChange={handleChange}
                            />
                    
                        <br/>
                        
                            <label htmlFor="review">Review: </label><br/>
                            <textarea className="all-form-input" type="text"
                                name="review"
                                value={formData.review}
                                onChange={handleChange}
                                required
                            />
                    
                        <br/>
                        
                            <label htmlFor="picture">Picture: </label><br/>
                            <input className="all-form-input" type="text"
                                name="picture"
                                value={formData.picture}
                                onChange={handleChange}
                                required
                            />
                        
                        <br/>
        
                        <button className="allform-button" type="submit">Update Post</button>
                    </form>
                </section>
                ): null}
            </div> */}



                <h2 className="post-details-info">{title}</h2>
                <h3 className="post-details-info">Country: {country}</h3>
                <h3 className="post-details-info">Date of visit: {visit_date}</h3>
                </div>
                <div className="userinfo">
                    <img className="avatar-in-postDetail"src={avatar} alt={username}/>
                    <h3 className="username-in-postDetail">{username} </h3>
                    <span role="img" aria-label="hometown">???? {hometown}</span><br/>
                    <span role="img" aria-label="bio">???? {bio}</span><br/>
                    <span role="img" aria-label="contributions"> ??????? {posts_count} {posts_count > 1 ? "Contributions" : "Contribution" } </span>
                </div>
                <div className="review-in-postDetail">
                    <p>{review}</p>
                </div>
                <div className="likes-comments-container">
                    {/* <button onClick={handleLike}>{currentLikes.length} {currentLikes.length > 1 ? "Likes" : "Like"}</button>
                    &nbsp;&nbsp;&nbsp; */}
                    
                    {/* <button >
                        {comments.length} {comments.length > 1 ? "Comments" :  "Comment"}
                    </button> */}
                    <CommentForm addNewComment={addNewComment} post={post} currentUser={currentUser} />
                    {renderComment}
                </div>
                
                {/* <div className="show-comment">

                </div> */}
            </div>

            
        </>
    )
}

export default PostDetail
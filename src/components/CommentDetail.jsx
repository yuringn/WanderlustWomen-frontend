import React, {useState} from "react"

function CommentDetail({currentUser, user_id, id, content, username, user_avatar, commentdate, editComment, deleteComment}){
   
    const [newComment, setNewComment] = useState("")
    const [editCommentForm, setEditCommentForm] = useState(false)

    const handleEditCommentForm = () => setEditCommentForm(showForm=>!showForm)

    const handleEditComment = (e) => {
        e.preventDefault()
        setNewComment("")
        
        fetch(`http://127.0.0.1:3003/comments/${id}`, {
                method:"PATCH",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({content: newComment})
            })
            .then(r => r.json())
            .then(comment => {
                editComment(comment)})
            setEditCommentForm(false)
        }
    
    const handleDelete =()=>{
        fetch(`http://127.0.0.1:3003/comments/${id}`, {
            method:"DELETE"
        })
        deleteComment(id)
    }     

    return (
        <>
            <div>
                <img className="avatar-in-commentDetail"src={user_avatar} alt={username}/><span>{username}</span> {commentdate}
                <p className="content">{content}   {user_id === currentUser.id ? (
                        <>
                            <span><button className="edit-btn-commentDetail" onClick = {handleEditCommentForm} className="updated-comment">{editCommentForm ? "Nevermind" : "Edit" }</button></span>
                            <span><button className="delete-btn-commentDetail " onClick = {handleDelete}>Delete</button></span>
                            
                        </>
                    
                    ): null}
                </p>
                        
            {/* </div>

            <div> */}
                
                {editCommentForm ? (
                    <form className="update-form" onSubmit={handleEditComment}>
                        <input 
                            type="text" 
                            id="comment"
                            name="comment"
                            value={newComment}
                            onChange={(e)=>setNewComment(e.target.value)}
                            required
                            />
                        <button className="editdelete-btn-commentDetail" type="submit">{editCommentForm ? "Update" : null}</button>
                    </form>
                ) : (null)
                }
                
                
            </div>
        </>
    )
}


export default CommentDetail
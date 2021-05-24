import React, {useState} from "react"

function CommentDetail({currentUser, user_id, id, content, username, commentdate, updateComment, deleteComment}){
   
    const [newComment, setNewComment] = useState("")
    const [editCommentForm, setEditCommentForm] = useState(false)

    const handleEditCommentForm = () => setEditCommentForm(showForm=>!showForm)

    const editComment = (e) => {
        e.preventDefault()
        setNewComment("")
        
        fetch(`http://127.0.0.1:3001/comments/${id}`, {
                method:"PATCH",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({content: newComment})
            })
            .then(r => r.json())
            .then(comment => {console.log(comment)
                updateComment(comment)})
                setEditCommentForm(false)
        }
    
    const handleDelete =()=>{
        fetch(`http://127.0.0.1:3001/comments/${id}`, {
            method:"DELETE"
        })
        deleteComment(id)
    }     

    return (
        <>
            <div>
            <p>{content} / <span>{username}</span> {commentdate} {user_id === currentUser.id ? (
                    <>
                        <span><button onClick = {handleEditCommentForm} className="updated-comment">{editCommentForm ? "Nevermind" : "Edit My Comment" }</button></span>
                        <span><button onClick = {handleDelete}>Delete My Comment</button></span>
                        
                    </>
                   
                 ): null}
            </p>
                    
            {/* </div>

            <div> */}
                
                {editCommentForm ? (
                    <form className="update-form" onSubmit={editComment}>
                        <input 
                            type="text" 
                            id="comment"
                            name="comment"
                            value={newComment}
                            onChange={(e)=>setNewComment(e.target.value)}
                            required
                            />
                        <button type="submit">{editCommentForm ? "Update" : null}</button>
                    </form>
                ) : (null)
                }
                
                
            </div>
        </>
    )
}


export default CommentDetail
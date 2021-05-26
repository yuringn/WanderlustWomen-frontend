import React, {useState} from "react"

function CommentForm({addNewComment, post, currentUser}){
    const [content, setContent] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setContent("")
        const newComment = {content, post_id: post.id, user_id: currentUser.id}

        fetch("http://127.0.0.1:3003/comments/", {
            method:"POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newComment)
        })
        .then(r => r.json())
        .then(data => {console.log(data)
            addNewComment(data)})
    }
    return (
        <div className="comment-form">
            <h3>Leave a Comment:</h3>
            <form className="review-form" onSubmit={handleSubmit}>
                <label htmlFor="comment">Comment: </label>
                <input 
                type="text" 
                name="comment"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                required
                />
                <br/>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    )
}

export default CommentForm;
import React, {useState, useEffect} from "react"

function CommentDetail({id, content, username, commentdate, updateComment, deleteComment}){
    console.log(id)
    console.log(content)
    const [newComment, setNewComment] = useState("")
    const [date, setDate] = useState("")

    const editComment = (e) => {
        e.preventDefault()
        setNewComment("")

        fetch(`http://127.0.0.1:3001/comments/${id}`, {
                method:"PATCH",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({comment: newComment})
            })
            .then(r => r.json())
            .then(comment => updateComment(comment))
        }
    
    return (
        <div>
            <p>{content} / <span>{username}</span> {commentdate}</p>
            <span></span>
        </div>
    )
}


export default CommentDetail
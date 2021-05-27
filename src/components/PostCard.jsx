import React from "react"
import {useHistory} from "react-router-dom"

function PostCard({id, picture, title, country,likes}){
    
    const history = useHistory()
    const handleClick =()=>history.push(`posts/${id}`)
    return (
        <div onClick={handleClick}>
            <img src={picture} alt={country}/>
            <h2>{title}</h2>
            <h3>{likes.length}</h3>
        </div>
    )
}

export default PostCard
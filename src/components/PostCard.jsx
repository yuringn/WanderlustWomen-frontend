import React from "react"
import {useHistory} from "react-router-dom"

function PostCard({id, picture, title, country,likes}){
    
    const history = useHistory()
    const handleClick =()=>history.push(`posts/${id}`)
    return (
        <li className="post-card">
            
            <img className="post-card-image" src={picture} alt={country}/>
            <h3 className="post-card-total-like">{likes.length}</h3> 
            <h2 className="post-card-title">{title}</h2>
            <button onClick={handleClick}className="button-viewmore"><span>View More</span></button>
        
            
        </li>
    )
}

export default PostCard
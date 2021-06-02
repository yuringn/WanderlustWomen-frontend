import React from "react"
import {useHistory} from "react-router-dom"

function PostCard({id, picture, title, country, likes_count, currentUser}){
    
    const history = useHistory()
    const handleClick =()=>history.push(`posts/${id}`)
    return (
        <li className="post-card">
            
            <img className="post-card-image" src={picture} alt={country}/>
            <h3 className="post-card-total-like">{likes_count} 👍🏻 </h3> 
            <h3 className="post-card-title">{title}</h3>
            {currentUser && 
                <button onClick={handleClick}className="button-viewmore"><span>View More</span></button>
            }
            
        </li>
    )
}

export default PostCard
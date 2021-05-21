import React from "react"
import {useHistory} from "react-router-dom"

function PostCard({id, pictures, title, location}){
    
    const history = useHistory()
    const handleClick =()=>history.push(`posts/${id}`)
    return (
        <div onClick={handleClick}>
            <img src={pictures} alt={location}/>
            <h2>{title}</h2>
        </div>
    )
}

export default PostCard
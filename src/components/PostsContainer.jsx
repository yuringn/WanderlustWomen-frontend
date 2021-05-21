import React, {useState, useEffect} from "react"
import PostCard from "./PostCard"

function PostsContainer(){
    const [allPosts, setAllPosts] = useState([])

    useEffect(()=>{
        fetch("http://127.0.0.1:3001/posts")
        .then(r => r.json())
        .then(setAllPosts)
    },[])

    const postCard = allPosts.map(post=> <PostCard key={post.id} {...post}/>)
    return (
        <div>
            {postCard}
        </div>
        )
}
export default PostsContainer
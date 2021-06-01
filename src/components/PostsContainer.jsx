import React, {useState, useEffect} from "react"
import FilterPosts from "./FilterPosts"
import PostCard from "./PostCard"
import Search from "./Search"

function PostsContainer(){
    const [allPosts, setAllPosts] = useState([])
    const [filterAllPosts, setFilterAllPosts] = useState("--")
    const [searchPost, setSearchPost] = useState("")

    
    useEffect(()=>{
        fetch("http://127.0.0.1:3003/posts")
        .then(r => r.json())
        .then(posts=>{
            console.log(posts)
            setAllPosts(posts)
            
            
            
        })
        
        
    },[])
    

    // const filterPosts = allPosts.filter(post => {
    //     if (filterAllPosts === "--"){
    //         return post
    //     }if (filterAllPosts === "Recent Travel"){
    //         const sortByDate = [...allPosts].sort((a,b)=>(b.visit_date) - (a.visit_date))
    //         console.log(sortByDate)
    //         return sortByDate ===filterAllPosts
    //     }
    // })
    
    
    const postCard = [...allPosts].sort((a,b) => (b.id)- (a.id))
                                .filter(post=>post.country.toLowerCase().includes(searchPost.toLowerCase()))
                                .map(post => <PostCard key={post.id} {...post}/>)                      
    return (
        <section>
            {allPosts ? 
            <>
            <Search searchPost={searchPost} setSearchPost={setSearchPost}/>
            
            </>
        : <h1 className="incase-nopost">Loading...</h1>}
           
            {/* <FilterPosts setFilterAllPosts={setFilterAllPosts}/> */}
             
            {postCard.length > 0 ? <ul className="post-container-card">{postCard}</ul> : <h1 className="incase-nopost"> Sorry. There is no post for this country yet. </h1>}
        </section>
        )
}
export default PostsContainer
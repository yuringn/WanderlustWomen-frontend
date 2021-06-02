import React, {useState, useEffect} from "react"
import FilterPosts from "./FilterPosts"
import PostCard from "./PostCard"
import Search from "./Search"

function PostsContainer({allPosts, currentUser}){
    // console.log("allPosts", allPosts.length)
    const [searchPost, setSearchPost] = useState("")
    const [filterAllPosts, setFilterAllPosts] = useState("--")
    // const [loading, setLoading] = useState(true)

    // const handleLoading =()=> setLoading(loading=>!loading)
    
// console.log("online 20", allPosts)
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
                                .map(post => <PostCard key={post.id} {...post} currentUser={currentUser}/>) 
                                
 
    return (
        <section>
            <Search searchPost={searchPost} setSearchPost={setSearchPost}/>
            {/* <FilterPosts setFilterAllPosts={setFilterAllPosts}/> */} 
            {postCard.length > 0  
            ? <ul className="post-container-card">{postCard}</ul> 
            : <h1 className="incase-nopost"> Sorry. There is no post for this country yet. </h1>
            }
        </section>

        )
}
export default PostsContainer
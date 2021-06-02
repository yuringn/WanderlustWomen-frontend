import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from "react-router-dom";
import NavBar from "./NavBar"
import NewPostForm from "./NewPostForm"
import Home from "./Home"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignupForm"
import PostsContainer from "./PostsContainer"
import PostDetail from "./PostDetail"
import Profile from "./Profile"
import UpdateProfileForm from "./UpdateProfileForm";

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  
  useEffect(()=>{
    const token = localStorage.getItem("token")
    fetch ("http://127.0.0.1:3003/me", {
      headers: {"Authorization": `Bearer ${token}`}
  })
    .then (resp => {
      return resp.json().then(data=>{
        if (resp.ok){
            return data
        }else{
            throw data
        }
      })
    })
    .then (user => setCurrentUser(user))
  },[])

// ---------- ADD/DELETE NEW POST ----------  //
  useEffect(()=>{
    fetch("http://127.0.0.1:3003/posts")
    .then(r=>r.json())
    .then(setAllPosts)
  },[])

  const addNewPost = (newPost) => {
    const newPostArr = [...allPosts, newPost]
    setAllPosts(newPostArr)
  }

  // const editPost = (editPostObj) => {
  //   console.log( editPostObj)
  //   const postUpdate = posts.map(post => {
  //     if (post.id === editPostObj.id){
  //       return editPostObj
  //     }else return post
  //   })
  //   setPosts(postUpdate)
  // }

  const deletePost = (postId) => {
    const removePost = allPosts.filter(post => post.id!==postId)
    setAllPosts(removePost)
  }
// ----------  ADD/ DELETE NEW POST ----------  //
  
  return (
    <div className="App">
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Switch>
        <Route exact path ="/">
          <Home/>
        </Route>

        <Route exact path="/login">
          <LoginForm setCurrentUser = {setCurrentUser}/> 
        </Route>
       
        <Route exact path="/signup">
          <SignUpForm setCurrentUser = {setCurrentUser}/>  
        </Route>

        <Route exact path="/profile/">
          {currentUser && <Profile currentUser = {currentUser} /> } 
        </Route>

        <Route exact path="/edit-profile/">
          {currentUser && <UpdateProfileForm currentUser = {currentUser} setCurrentUser={setCurrentUser}/> } 
        </Route>

        <Route exact path="/posts">
          {allPosts.length > 0 && <PostsContainer allPosts={allPosts} currentUser={currentUser} /> } 
        </Route>

        <Route exact path="/posts/:id">
          {currentUser && <PostDetail currentUser={currentUser}
          // editPost={editPost} 
          deletePost={deletePost}
          /> }
        </Route>
        
        <Route exact path="/new-post">
          {currentUser && <NewPostForm currentUser={currentUser} addNewPost={addNewPost} /> }
        </Route>

      </Switch>
       
      
    </div>
  );
}

export default App;

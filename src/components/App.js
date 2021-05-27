import React, {useState, useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import NavBar from "./NavBar"
import NewPostForm from "./NewPostForm"
import Home from "./Home"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignupForm"
import PostsContainer from "./PostsContainer"
import PostDetail from "./PostDetail"
import Profile from "./Profile"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [posts, setPosts] = useState([])
  

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

// ---------- ADD NEW POST ----------  //
  useEffect(()=>{
    fetch("http://127.0.0.1:3003/posts")
    .then(r=>r.json())
    .then(setPosts)
  })

  const addNewPost = (newPost) => {
    const newPostArr = [...posts, newPost]
    setPosts(newPostArr)
  }

  const updatePost = (postObj) => {
    const update = posts.map(post => {
      if (post.id === postObj.id){
        return postObj
      }else return post
    })
    setPosts(update)
  }
// ----------  ADD NEW POST ----------  //
  
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
          {currentUser ? <Profile currentUser = {currentUser} setCurrentUser={setCurrentUser}/> : null } 
        </Route>

        <Route exact path="/posts">
          <PostsContainer />  
        </Route>

        <Route exact path="/posts/:id">
          {currentUser ? <PostDetail currentUser={currentUser}
          updatePost={updatePost}/> : null}
        </Route>
        
        <Route exact path="/new-post">
          {currentUser ? <NewPostForm currentUser={currentUser} addNewPost={addNewPost} /> : null}
        </Route>

      </Switch>
       
      
    </div>
  );
}

export default App;

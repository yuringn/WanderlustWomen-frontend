import React, {useState, useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignupForm"
import PostsContainer from "./PostsContainer"
import PostDetail from "./PostDetail"
import Profile from "./Profile"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  // console.log("current user",currentUser)

    useEffect(()=>{
      const token = localStorage.getItem("token")
      fetch ("http://127.0.0.1:3001/me", {
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
          {currentUser ? <Profile currentUser = {currentUser}/> : null } 
        </Route>

        <Route exact path="/posts">
          <PostsContainer />  
        </Route>

        <Route exact path="/posts/:id">
          {currentUser ? <PostDetail currentUser={currentUser}/> : null}
        </Route>

      </Switch>
       
      
    </div>
  );
}

export default App;

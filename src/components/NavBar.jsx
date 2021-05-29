import React from "react"
import {NavLink, useHistory} from "react-router-dom"
import logo from "./logo.png"
import logo2 from "./logo2.png"
import wanderlust from "./wanderlust.png"
function NavBar({currentUser, setCurrentUser}){
    const history = useHistory()
    const logout=()=>{
       localStorage.getItem("token")
       setCurrentUser(null)
       history.push("/")
    }
    return(
       
       
        <nav>
           <img className = "logo" src={logo} alt="logo"/>
           <img  className = "logo2"src={logo2} alt="logo"/>
           <img  className = "logo2"src={wanderlust} alt="logo"/>
            {currentUser? (
               <div className="main-menu-button">
                  <NavLink className="button" to="/posts">
                     All Posts
                  </NavLink>
                  <NavLink to="/profile">
                     Profile
                  </NavLink>
                  <NavLink to="/new-post">
                     Write a post
                  </NavLink>
                  <button onClick={logout} className="button">Logout</button>
               </div>
            ):(
               <div className="lgn-sgn-button">
                  <NavLink className="button" to="/login">
                     Login
                  </NavLink>
                  <NavLink className="button" to="/signup">
                     Sign Up
                  </NavLink>
               </div>
            )}
        </nav>
        
    )
}

export default NavBar;
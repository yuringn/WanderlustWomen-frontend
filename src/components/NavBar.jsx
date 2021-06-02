import React from "react"
import {NavLink, useHistory} from "react-router-dom"
import logo from "./logo.png"
import "./Navbar.css"

function NavBar({currentUser, setCurrentUser}){
   const history = useHistory()

   const logout =()=>{
      localStorage.getItem("token")
      setCurrentUser(null)
      history.push("/")
   }

   return(
      <nav className ="navbar">
         <div className="navbar-container">
         <NavLink to ="/">
            <img  className = "logo" src={logo} alt="logo"/>
         </NavLink>
         {currentUser? (
            <>
            <ul className="nav-menu">
               <li className="nav-item">
                  <NavLink className="nav-links" to ="/profile" >
                     Profile
                  </NavLink>
               </li>
               <li className="nav-item">
                     <NavLink className="nav-links" to ="/posts" >
                        All Posts
                     </NavLink>
               </li>
               <li className="nav-item">
                  <NavLink className="nav-links" to ="/new-post" >
                     Write new post
                  </NavLink>
               </li>
               <li className="nav-item">
                  <NavLink className="nav-links" to  ="/" onClick={logout}>
                     Logout
                  </NavLink>
               </li>
            </ul>
            </>
                        ):(
            <> 
            <ul className="nav-menu">
               <li className="nav-item">
                     <NavLink className="nav-links" to ="/posts" >
                        All Posts
                     </NavLink>
               </li>
               <li className="nav-item">
                  <NavLink className="nav-links" to ="/login" >
                     Login
                  </NavLink>
               </li>
               <li className="nav-item">
                  <NavLink className="nav-links" to ="/signup" >
                     Sign Up
                  </NavLink>
               </li>
            </ul>
            </>
         )}
         </div>
      </nav>    
   )
}

export default NavBar;
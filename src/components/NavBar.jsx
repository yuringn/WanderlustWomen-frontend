import React from "react"
import {NavLink, useHistory} from "react-router-dom"

function NavBar({currentUser, setCurrentUser}){
    const history = useHistory()
    const logout=()=>{
       localStorage.getItem("token")
       setCurrentUser(null)
       history.push("/")
    }
    return(
        <nav>
            {currentUser? (
               <div className="main-menu-button">
                  <NavLink className="button" to="/posts">
                     All Posts
                  </NavLink>
                  <NavLink to="/profile">
                     Profile
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
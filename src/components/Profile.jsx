import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import UpdateProfileForm from "./UpdateProfileForm"



function Profile({currentUser}){
    console.log(currentUser)
    const history = useHistory()
    
    const handleEditProfile =()=>history.push("/edit-profile")
    
    return (
        <>
        <h1 className="h1-profile">Profile Page</h1>
       
        <main className="profile-cover">
            <div className="profile-container"> 
                <div className="header">
                    <i onClick={handleEditProfile} className="edit-icon fas fa-user-edit"></i>
                </div>
                <div className="middle">
                    <img className="profile-image"src ={currentUser.avatar} alt={currentUser.username}/>
                    <h1 className ="user-name">{currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}</h1>
                    <p>Total contributions: {currentUser.posts_count} posts</p>
                    <p>Username: {currentUser.username}</p>
                    <p>Email: {currentUser.email}</p>
                    <p>Hometown: {currentUser.hometown}</p>
                    <p>Bio: {currentUser.bio}</p>
                </div>
            </div>
        </main>       
        </>
    )
}
export default Profile
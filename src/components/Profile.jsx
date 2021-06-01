import React, {useState} from "react"
import UpdateProfileForm from "./UpdateProfileForm"


function Profile({currentUser, setCurrentUser}){
    
    const [editProfile, setEditProfile] = useState(false)
   
    const handleShowEditProfile =()=> setEditProfile(show=>!show)
    return (
        <>
        <h1 className="h1-profile">Profile Page</h1>
       
        <main className="profile-cover">
            <div className="profile-container"> 
            <div className="middle">
            <img className="profile-image"src ={currentUser.avatar} alt={currentUser.username}/>
            <h2>Username:{currentUser.username}</h2>
           
            
            <p>Email: {currentUser.email}</p>
            <p>Hometown: {currentUser.hometown}</p>
            <p>Bio: {currentUser.bio}</p>
            <button onClick={handleShowEditProfile}>Edit Profile ?</button>
            {/* {editProfile?  */}
            <UpdateProfileForm currentUser={currentUser} setCurrentUser={setCurrentUser} setEditProfile={setEditProfile}/>
                {/* // :null} */}
                </div>
                </div>
         </main>       
        </>
    )
}
export default Profile
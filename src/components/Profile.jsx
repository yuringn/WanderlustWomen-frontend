import React, {useState} from "react"
import UpdateProfileForm from "./UpdateProfileForm"

function Profile({currentUser, setCurrentUser}){
    
    const [editProfile, setEditProfile] = useState(false)
   
    const handleShowEditProfile =()=> setEditProfile(show=>!show)
    return (
        <main>
            <button onClick={handleShowEditProfile}>Edit Profile ?</button>
                {/* {editProfile?  */}
                <UpdateProfileForm currentUser={currentUser} setCurrentUser={setCurrentUser} setEditProfile={setEditProfile}/>
                {/* // :null} */}
            
            <img src ={currentUser.avatar} alt={currentUser.username}></img>
            <p>Username:{currentUser.username}</p>
            <p>Email:{currentUser.email}</p>
            <p>Hometown: {currentUser.hometown}</p>
            <p>Bio: {currentUser.bio}</p>
        </main>
    )
}
export default Profile
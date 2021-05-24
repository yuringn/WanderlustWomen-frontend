import React, {useState} from "react"

function Profile({currentUser}){
    console.log(currentUser)
    const [editProfile, setEditProfile] = useState(false)
    const [formData, setFormData] = useState({
        username : currentUser.username,
        email : currentUser.email,
        password : currentUser.password,
        hometown : currentUser.hometown,
        bio : currentUser.bio,
        avatar : currentUser.avatar
    })

    const handleChange =(e)=>{
        const key = e.target.name
        setFormData({...formData, 
        [key]: e.target.value})
    }
   
    return (
        <main>
            <img src ={currentUser.avatar} alt={currentUser.username}></img>
            <p>Username:{currentUser.username}</p>
            <p>Email:{currentUser.email}</p>
            <p>Hometown: {currentUser.hometown}</p>
            <p>Bio: {currentUser.bio}</p>
        </main>
    )
}
export default Profile
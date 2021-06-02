import React, {useState} from "react"
import {useHistory} from "react-router-dom"

function UpdateProfileForm({currentUser, setCurrentUser}){
    const history = useHistory()
// User doesnt need to update everything ⬇️
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

    const handleUpdate = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        fetch ("http://127.0.0.1:3003/me", {
            method:"PATCH",
            headers: {"Content-type":"application/json",
                        "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(r=>r.json())
        .then(data => { 
                        setCurrentUser(data)
                        history.push("/profile")})
        
    }
    return (
        <>
            <h1 className="all-h1">Update Account </h1>
            <section className="all-form">
                <form onSubmit={handleUpdate}>
                        <label className="all-form-label" htmlFor="username">Username</label><br/>
                        <input className="all-form-input" type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    
                    <br/>
                        <label className="all-form-label" htmlFor="email">Email</label><br/>
                        <input className="all-form-input" type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                   
                    <br/>
                        <label className="all-form-label" htmlFor="password">Password</label><br/>
                        <input className="all-form-input" type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    
                    <br/>
                        <label className="all-form-label" htmlFor="hometown">Hometown</label><br/>
                        <input className="all-form-input" type="text"
                            name="hometown"
                            value={formData.hometown}
                            onChange={handleChange}
                        />
                    <br/>
                        <label className="all-form-label" htmlFor="bio">Bio</label><br/>
                        <input className="all-form-input" type="text"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    <br/>
                        <label className="all-form-label" htmlFor="avatar">Avatar</label><br/>
                        <input className="all-form-input" type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                        />
                    <br/>
                    <button className="allform-button" type="submit">Update</button>
                </form>
            </section>
        </>
    )
}

export default UpdateProfileForm
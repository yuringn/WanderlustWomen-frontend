import React, {useState} from "react"

function UpdateProfileForm({currentUser, setCurrentUser, setEditProfile}){
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
        .then(data => { console.log(data)
                        setCurrentUser(data)})
        setEditProfile(false)
    }
    return (
        <div>
            <form onSubmit={handleUpdate}>
                <h2>Update Account: </h2>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="hometown">Hometown</label>
                    <input type="text"
                        name="hometown"
                        value={formData.hometown}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <input type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="avatar">Avatar</label>
                    <input type="text"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateProfileForm
import React, { useState } from "react";
import { useHistory } from "react-router-dom"

function SignupForm({setCurrentUser}){
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        hometown: "",
        bio: "", 
        avatar: ""
    })
    
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const handleChange =(e)=>{
        const key = e.target.name
        setFormData({...formData, 
        [key]: e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        fetch ("http://127.0.0.1:3003/signup",{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData)
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
        .then (data => {
            // console.log(data)
            const {user, token} = data
            localStorage.setItem("token", token)
            setCurrentUser(user)
            history.push("/posts")
        })
        .catch(error => setErrors(error.errors))
    }

    return (
        <>
        <h1 className="all-h1">Signup</h1>
        <p className="p-signup">Please fill in this form to create an account.</p>
        <section className="all-form">
            <form onSubmit={handleSubmit}>
                    <label className="all-form-label" htmlFor="username">User Name </label><br/>
                        <input className="all-form-input" type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            required
                        />
                <br/>
                    <label className="all-form-label" htmlFor="email">Email </label><br/>
                        <input className="all-form-input" type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            required
                        />
                <br/>
                    <label className="all-form-label"  htmlFor="psw">Password </label><br/>
                        <input className="all-form-input"  type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            required
                        />
                <br/>
                    <label className="all-form-label" htmlFor="hometown">Hometown </label><br/>
                        <input className="all-form-input" type="text"
                            name="hometown"
                            value={formData.hometown}
                            onChange={handleChange}
                            placeholder="Enter Hometown"
                            required
                        />
                <br/>
                    <label className="all-form-label" htmlFor="bio">Bio </label><br/>
                        <input className="all-form-input" type="text"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Enter Bio"
                            required
                        />
                <br/>
                    <label className="all-form-label"  htmlFor="avatar">Avatar </label><br/>
                        <input className="all-form-input"  type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            placeholder="Enter Avatar Url"
                            required
                        />
                <br/>
                {errors.map(error=><h3 style={{color:"black"}} key={error}>{error +" !"}</h3>)}
                <br/>
                <button className="allform-button"type="submit">Sign Up</button>
            </form>
        </section>
        </>
    )
}

export default SignupForm

import React, {useState} from "react";
import {useHistory} from "react-router-dom"

function LoginForm ({ setCurrentUser }) {
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
        
        fetch ("http://127.0.0.1:3003/login",{
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
        <h1 className="all-h1">Login</h1>
        <section className="all-form">
            <form onSubmit={handleSubmit} className="login-box">
                <div>
                    <label className="all-form-label" htmlFor="username">User Name </label>
                        <br/>
                        <input className="all-form-input" type="text"
                            name="username"
                            placeholder="Enter Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                </div>
                <br/>
                <div>
                    <label className="all-form-label" htmlFor="psw">Password </label>
                    <br/>
                        <input className="all-form-input"  type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                </div>
                <br/>
                {errors.map(error=><h3 style={{color:"black"}} key={error}>{error}</h3>)}
                <br/>
                <button className="allform-button"type="submit">Login</button>
            </form>
        </section>
        </>
    )
}

export default LoginForm
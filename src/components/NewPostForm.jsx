import React, {useState} from "react"
import {useHistory} from "react-router-dom"

function NewPostForm({currentUser, addNewPost}){
    
    const history = useHistory()
    const [formData, setFormData] = useState({
        user_id: currentUser.id,
        country:"",
        title: "",
        visit_date: "",
        review: "",
        picture: ""
    })

    const handleChange =(e)=>{
        const key = e.target.name
        setFormData({...formData, 
        [key]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://127.0.0.1:3003/posts", {
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(formData)
        })
        .then (r => r.json())
        .then(newPost => {console.log(newPost)
                        addNewPost(newPost)
                        history.push("/posts")
        })
    }

    return (
         <div className="newpost-form">
            <h3>Write a post:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="country">Country: </label>
                    <select 
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    >   
                        <option value="France">France</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Italy">Italy</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Peru">Peru</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Spain">Spain</option>
                        <option value="Swiss">Swiss</option>
                        <option value="USA">USA</option>
                        <option value="Vietnam">Vietnam</option>
                        
                    </select>
                </div>
                <br/>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Please include city or country in your title"
                        required
                    />
                </div>
                <br/>
                 <div>
                    <label htmlFor="visit_date">Visit Date: </label>
                    <input type="date"
                        name="visit_date"
                        value={formData.visit_date}
                        min="01-01-2015" max ="12-31-2030"
                        onChange={handleChange}
                    />
                </div>
                <br/>
                 <div>
                    <label htmlFor="review">Review: </label>
                    <input type="text"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br/>
                 <div>
                    <label htmlFor="picture">Picture: </label>
                    <input type="text"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br/>

                <button type="submit">Create Your Post</button>
            </form>
        </div>
    )
}

export default NewPostForm
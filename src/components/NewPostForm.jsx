import React, {useState} from "react"
import {useHistory} from "react-router-dom"

function NewPostForm({currentUser, addNewPost}){
    let todaysDate = new Date()
    let year = todaysDate.getFullYear()
    let month = ("0" + (todaysDate.getMonth() + 1)).slice(-2);  // MM
    let day = ("0" + todaysDate.getDate()).slice(-2);
    let maxDate = (year + "/" + month + "/" + day)
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
        .then(newPost => {
                        addNewPost(newPost)
                        history.push("/posts")
        })
    }

    return (
        <>
         <h1 className="h1-write-post">Write a post</h1>
         <div className="all-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="country">Country: </label><br/>
                    <select className="all-form-input"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    >   
                        <option value="Select a Country">Select A Country</option>
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
                    <label htmlFor="title">Title: </label><br/>
                    <input className="all-form-input" type="text" 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Please include city or country in your title"
                        required
                    />
                </div>
                <br/>
                 <div>
                    <label htmlFor="visit_date">Visit Date: </label><br/>
                    <input className="all-form-input" type="date"
                        name="visit_date"
                        value={formData.visit_date}
                        min="01-01-2015" max = {maxDate}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                 <div>
                    <label htmlFor="review">Review: </label><br/>
                    <textarea className="all-form-input review" type="text"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        placeholder="Write something..."
                        required
                    />
                </div>
                <br/>
                 <div>
                    <label htmlFor="picture">Picture: </label><br/>
                    <input className="all-form-input" type="text"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                        placeholder="Enter Picture Url"
                        required
                    />
                </div>
                <br/>

                <button className="button-login-signup"type="submit">Submit</button>
            </form>
        </div>
        </>
    )
}

export default NewPostForm
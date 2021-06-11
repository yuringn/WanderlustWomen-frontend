import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"

function EditPostForm({currentUser}){
    const [post, setPost] = useState([])
    const {id} = useParams()
    const history = useHistory()
    const [formData, setFormData] = useState({
        user_id: currentUser.id,
        country: "",
        title: "",
        visit_date: "",
        review: "",
        picture: ""
    })

    useEffect(() => {
        fetch (`http://127.0.0.1:3003/posts/${id}`)
        .then(r => r.json())
        .then(post => {
                    setPost(post)
                    setFormData(post)     
        })
    },[id])

    const editPost = (editPostObj) => {
        console.log( editPostObj)
        setPost(editPostObj)
      }

    // const [editPostForm, setEditPostForm] = useState(false)

    // const handleEditPostForm = () => setEditPostForm(showForm=>!showForm)

    const handleChange = (e) => {
        const key = e.target.name
        setFormData({...formData, 
        [key]: e.target.value})
    }

    const handleEditPost = (e) => {
        e.preventDefault()

        fetch(`http://127.0.0.1:3003/posts/${id}`,{
            method:"PATCH",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(post => { console.log(post)
                        editPost(post)
                        history.push(`/posts/${id}`)
                    })
        // setEditPostForm(false)  
    }


    return (
        <div>
            <h1 className="all-h1">Edit Your Post </h1>
            <section className="all-form edit-post">
                <form onSubmit={handleEditPost}>
                    <label className="all-form-label" htmlFor="country">Country: </label><br/>
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
            
                <br/>
                
                    <label htmlFor="title">Title: </label><br/>
                    <input className="all-form-input" type="text" 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Please include city or country in your title"
                        required
                    />
                
                <br/>
            
                    <label htmlFor="visit_date">Visit Date: </label><br/>
                    <input className="all-form-input" type="date"
                        name="visit_date"
                        value={formData.visit_date}
                        min="01-01-2015" max ="12-31-2030"
                        onChange={handleChange}
                    />
            
                <br/>
                
                    <label htmlFor="review">Review: </label><br/>
                    <textarea className="all-form-input" type="text"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        required
                    />
            
                <br/>
                
                    <label htmlFor="picture">Picture: </label><br/>
                    <input className="all-form-input" type="text"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                        required
                    />
                
                <br/>

                <button className="allform-button" type="submit">Update Post</button>
            </form>
        </section>
        
    </div>
    )
}

export default EditPostForm
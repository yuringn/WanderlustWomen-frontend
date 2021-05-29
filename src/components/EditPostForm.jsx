// import React, {useState} from "react"

// function EditPostForm({updatePost, id, currentUser}){
//     const [formData, setFormData] = useState({
//         user_id: currentUser.id,
//         country: currentUser.country,
//         title: currentUser.title,
//         visit_date: currentUser.visit_date,
//         review: currentUser.review,
//         picture: currentUser.picture
//     })
//     const [editPostForm, setEditPostForm] = useState(false)

//     const handleEditPostForm = () => setEditPostForm(showForm=>!showForm)

//     const handleChange = (e) => {
//         const key = e.target.name
//         setFormData({...formData, 
//         [key]: e.target.value})
//     }

//     const handleEditPost = (e) => {
//         e.preventDefault()

//         fetch(`http://127.0.0.1:3003/posts/${id}`,{
//             method:"PATCH",
//             headers: {"Content-type":"application/json"},
//             body: JSON.stringify(formData)
//         })
//         .then(r => r.json())
//         .then(post => { console.log(post)
//                         updatePost(post)})
//         setEditPostForm(false)  
//     }
//     return (
//         <div>
//         {/* editPostForm ? ( */}
//             <form onSubmit={handleEditPost}>
//             <div>
//                 <label htmlFor="country">Country: </label>
//                 <select 
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                 >   
//                     <option value="France">France</option>
//                     <option value="Georgia">Georgia</option>
//                     <option value="Germany">Germany</option>
//                     <option value="Indonesia">Indonesia</option>
//                     <option value="Italy">Italy</option>
//                     <option value="Netherlands">Netherlands</option>
//                     <option value="Peru">Peru</option>
//                     <option value="Singapore">Singapore</option>
//                     <option value="Spain">Spain</option>
//                     <option value="Swiss">Swiss</option>
//                     <option value="USA">USA</option>
//                     <option value="Vietnam">Vietnam</option>
                    
//                 </select>
//             </div>
//             <br/>
//             <div>
//                 <label htmlFor="title">Title: </label>
//                 <input type="text" 
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     placeholder="Please include city or country in your title"
//                     required
//                 />
//             </div>
//             <br/>
//              <div>
//                 <label htmlFor="visit_date">Visit Date: </label>
//                 <input type="date"
//                     name="visit_date"
//                     value={formData.visit_date}
//                     min="01-01-2015" max ="12-31-2030"
//                     onChange={handleChange}
//                 />
//             </div>
//             <br/>
//              <div>
//                 <label htmlFor="review">Review: </label>
//                 <input type="text"
//                     name="review"
//                     value={formData.review}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <br/>
//              <div>
//                 <label htmlFor="picture">Picture: </label>
//                 <input type="text"
//                     name="picture"
//                     value={formData.picture}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <br/>

//             <button type="submit">Update Post</button>
//         </form>
//         {/* )
//         : null */}
//     </div>
//     )
// }

// export default EditPostForm
import React, { useState } from "react";
import Axios from "axios";

const CreatePost = () => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [message, setMessage] = useState("");

    const changeOnClick = e => {
        
        e.preventDefault();

        const post = {
            blogTitle,
            blogText,
            authorName
        }

        Axios
            .post("http://localhost:8080/api/posts", post)
            .then(res => setMessage(res.data))
            .catch(err => {
                console.log(err);
            });
    }


    return (

        <form onSubmit={changeOnClick} encType="multipart/form-data"> 
            <h1>Create a Blog Post</h1>
            <span className="message">{message}</span>


            <div className="form-group">
                <label htmlFor="blogTitle">Blog Title:</label>
                <input 
                    type="text" 
                    id="blogTitle" 
                    className="form-control"
                    onChange={e => setBlogTitle(e.target.value)}  />
            </div>

            <div className="form-group">
                <label htmlFor="blogText">Blog Text:</label>
                <input 
                    type="text" 
                    id="blogText" 
                    className="form-control" 
                    onChange={e => setBlogText(e.target.value)} 
                    />
                
            </div>

            <div className="form-group">
                <label htmlFor="authorName">Author Name:</label>
                <input 
                    type="text" 
                    id="authorName" 
                    className="form-control"
                    onChange={e => setAuthorName(e.target.value)}  />
                
            </div>

            <button type="submit" className="submit-btn">Submit</button>

        </form>
    )
}



export default CreatePost;
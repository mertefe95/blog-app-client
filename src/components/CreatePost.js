import React, { useState } from "react";
import Axios from "axios";
import UserContext from "../context/UserContext";
import ErrorNotice from "../components/misc/ErrorNotice";


const CreatePost = () => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState();
    
    const { userData, setUserData } = useContext(UserContext); 
        


    const changeOnClick = e => {
        const userId = userData.user._id
    
        e.preventDefault();

        try {
        const post = {
            blogTitle,
            blogText,
            userId
        }

        Axios
            .post("http://localhost:8080/api/posts", post)
            .then(res => setMessage(res.data))
            .catch(err => {
                console.log(err);
            });
        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }}
    


    return (

        <form className="create-post-form" onSubmit={changeOnClick} encType="multipart/form-data"> 
            <h1>Create a Blog Post</h1>
            <span className="message">{message}</span>
            <h4>
            {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            </h4>


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
import React, {useState, useEffect} from "react";
import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice";


const EditPost = props => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState();

    const changeOnClick = e => {
        e.preventDefault();

        try {

        const post = {
            blogTitle,
            blogText,
            authorName
        };

        setBlogTitle("");
        setBlogText("");
        setAuthorName("");

        Axios
            .put(`http://localhost:8080/api/posts/${props.match.params.id}`, post)
            .then(res => setMessage(res.data))
            .catch(err => {
                console.log(err);
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }}
    

    return (
        <form onSubmit={changeOnClick} encType="multipart/form-data"> 
            <h1>Update Article</h1>
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

            <button type="submit" className="submit-btn">Update Post</button>

        </form>
    )
    }
export default EditPost;
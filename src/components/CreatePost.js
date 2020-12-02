import React, {useState} from "react";
import Axios from "axios";

const CreatePost = () => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogText, setBlogText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [message, setMessage] = useState('');

    const changeOnClick = e => {
        e.preventDefault();

        const post = {
            blogTitle,
            blogText,
            authorName   
        };

        setBlogTitle("");
        setBlogText("");
        setAuthorName("");

        Axios.post('https://blog-app-mern-stack.herokuapp.com/api/posts', post)
        .then(res => setMessage(res.data))
        .catch(err => {
            console.log(err);
        })
    };

    return (
    <form onSubmit={changeOnClick} encType="multipart/form-data" className="create-post-form">
        <h2>Create Post</h2>
        <span className="message-create">{message}</span>

        <label htmlFor="blogTitle">Blog Title:</label>
        <input onChange={e => setBlogTitle(e.target.value)} type="text" value={blogTitle} id="blogTitle" name="blogTitle" ></input>

        <label htmlFor="blogText">Blog Text:</label>
        <input onChange={e => setBlogText(e.target.value)} type="text" value={blogText} id="blogText" name="blogText"></input>

        <label htmlFor="authorName">Author Name:</label>
        <input onChange={e => setAuthorName(e.target.value)} type="text" value={authorName} id="authorName" name="authorName"></input>

        <button type="submit">Submit</button>
    </form>
)
}

export default CreatePost;
import React, {useState, useEffect} from "react";
import Axios from "axios";

const EditPost = props => {
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

        Axios.put(`http://localhost:8080/api/posts/${props.match.params.id}`, post)
            .then(res => setMessage(res.data))
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        Axios.get(`http://localhost:8080/api/posts/${props.match.params.id}`)
        .then(res => [
            setBlogTitle(res.data.blogTitle),
            setBlogText(res.data.blogText),
            setAuthorName(res.data.authorName)
        ])
        .catch(error => console.log(error));
    }, []);


    return (
    <form onSubmit={changeOnClick} encType="multipart/form-data" className="edit-post-form">
        <h2>Edit Post</h2>
        <span className="message-edit">{message}</span>
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

export default EditPost;
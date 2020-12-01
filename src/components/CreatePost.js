import React, {useState} from "react";
import Axios from "axios";

const CreatePost = () => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogText, setBlogText] = useState('');
    const [authorName, setAuthorName] = useState('');

    const changeOnClick = e => {
        e.preventDefault();

        const post = {
            blogTitle,
            blogText,
            authorName   
        }

        Axios.post('https://blog-app-mern-stack.herokuapp.com/api/posts', post)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err);
            })
    };

    return (
    <form onSubmit={changeOnClick} encType="multipart/form-data" className="create-post-form">
        <label htmlFor="blogtitle">Blog Title:</label>
        <input onChange={e => setBlogTitle(e.target.value)} type="text" id="blogtitle" name="blogtitle" ></input>

        <label htmlFor="blogtext">Blog Text:</label>
        <input onChange={e => setBlogText(e.target.value)} type="text" id="blogtext" name="blogtext"></input>

        <label htmlFor="authorname">Author Name:</label>
        <input onChange={e => setAuthorName(e.target.value)} type="text" id="authorname" name="authorname"></input>

        <button type="submit">Submit</button>
    </form>
)
}

export default CreatePost;
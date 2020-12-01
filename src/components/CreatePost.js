import React, {useState} from "react";

const CreatePost = () => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogText, setBlogText] = useState('')
    const [authorName, setAuthorName] = useState('')
    
    return (
    <form className="create-post-form">
        <label htmlFor="blogtitle">Blog Title:</label>
        <input type="text" id="blogtitle" name="blogtitle" ></input>

        <label htmlFor="blogtext">Blog Text:</label>
        <input type="text" id="blogtext" name="blogtext"></input>

        <label htmlFor="authorname">Author Name:</label>
        <input type="text" id="authorname" name="authorname"></input>

        <button type="submit">Submit</button>
    </form>
)
}

export default CreatePost;
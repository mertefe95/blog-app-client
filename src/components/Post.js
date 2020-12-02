import React, { useState, useEffect } from "react";
import Axios from "axios";

const Post = (props) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [authorName, setAuthorName] = useState("");

useEffect(() => {
    Axios.get(`http://localhost:8080/api/posts/${props.match.params.id}`)
    .then(res => [
        setBlogTitle(res.data.blogTitle),
        setBlogText(res.data.blogText),
        setAuthorName(res.data.authorName)
    ])
    .catch(error => console.log(error));
}, [props]);

    return (
        <div>
        <h2>{blogTitle}</h2>
        <p>{blogText}</p>
        <p>{authorName}</p>
        </div>
    );
};

export default Post;
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice";

const Post = (props) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [error, setError] = useState();

useEffect(() => {
    try {
    Axios.get(`http://localhost:8080/api/posts/${props.match.params.id}`)
    .then(res => [
        setBlogTitle(res.data.blogTitle),
        setBlogText(res.data.blogText),
        setAuthorName(res.data.authorName)
    ])
    .catch(error => console.log(error));

    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
}, [props]);

    return (
        <div>
        <h2>{blogTitle}</h2>
        <p>{blogText}</p>
        <p>{authorName}</p>
        <h4>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        </h4>
        </div>
    );
};

export default Post;
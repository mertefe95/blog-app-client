import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Posts = ({posts}) => {
    const [post, setPost] = useState([]);
    // DELETE POST BY ID
    const deletePost = id => {
        Axios.delete(`https://blog-app-mern-stack.herokuapp.com/${id}`)
            .then(res => alert(res.data))
            setPost(post.filter(elem => elem._id !== id));
    }
    return (
    
    
    <div>
    Welcome to the Viewing all the Blog Posts.
    
    {posts.map((post, key) => (
    <div className="post-div" key={key}>


        <Link to={{
            pathname: `/post/${post._id}`
        }}>


        <h2>{post.blogTitle}</h2>

        </Link>


        
        <p>{post.blogText}</p>
        <span>{post.authorName}</span>

        <div className="post-icons-div">
            <Link to={`/edit-post/${post._id}`}><i className="far fa-edit"></i></Link>
            <Link><button onClick={() => deletePost(post._id)}><i className="far fa-trash-alt"></i></button></Link>
        </div>
    </div>
    ))}
    </div>
    )
};

export default Posts;
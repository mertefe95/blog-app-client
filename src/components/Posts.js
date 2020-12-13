import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import ErrorNotice from "../components/misc/ErrorNotice";

const Posts = ({ posts }) => {
    const [post, setPost] = useState([]);
    const [error, setError] = useState();

    const { userData, setUserData } = useContext(UserContext); 

    const history = useHistory();

    // DELETE POST BY ID
    const deletePost = id => {
        try {
        Axios.delete(`http://localhost:8080/api/posts/${id}`)
            .then(res => alert(res.data))
            setPost(post.filter(elem => elem._id !== id));
        }   catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }}

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
        <h4>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        </h4>
        
        { userData.user ? (
            <div className="post-icons-div">
            <Link to={`/edit-post/${post._id}`}><i className="far fa-edit"></i></Link>
            <Link><button onClick={() => deletePost(post._id)}><i className="far fa-trash-alt"></i></button></Link>
            </div>
        ) : (
            <>

            </>
        )}
        
    </div>
    ))}
    </div>
    )
};

export default Posts;
import React from "react";

const Posts = ({posts}) => {
    return (
    
    
    <div>
    Welcome to the Viewing all the Blog Posts.
    
    {posts.map((post, key) => (
    <div className="post-div">
        <h2>{post.blogTitle}</h2>
        <p>{post.blogText}</p>
        <span>{post.authorName}</span>

        <div className="post-icons-div">
            <a><i class="far fa-edit"></i></a>
            <a><i class="far fa-trash-alt"></i></a>  
        </div>
    </div>
    ))}
    </div>
    )
};

export default Posts;
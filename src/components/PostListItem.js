import React from "react";

class PostListItem extends React.Component {
    constructor (props) {
        super(props);

        this.onShowPost = this.onShowPost.bind(this);

    }

    onShowPost() {
        window.location.pathname = `/posts/${this.props.post._id}`
    }


    renderDate(dateString) {

        const date = new Date(dateString);

        return `${date.getDate()}, 
                ${date.getMonth() + 1},
                ${date.getFullYear()}`;
    }


    render() {

        const {post} = this.props; 

        return (
                <div class="single-post">
                <a className="btn" onClick={this.onShowPost} >
                    <button><i class="fas fa-trash-alt"></i></button>
                    <h3>{post.blogTitle}</h3>
                    <p>{post.authorName}</p>
                    <span>{this.renderDate(post.createdAt)}</span>
                    
                </a>
                </div>
        );
    }
}

export default PostListItem;
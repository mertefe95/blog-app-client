import Axios from "axios";
import React from "react";

class Post extends React.Component {
    state = {
        post: {}
    };

    componentDidMount() {
        this.getPost();
    }

    async getPost() {
        const res = await Axios.get(`https://blog-app-mern-stack.herokuapp.com/api/posts/${this.props.match.params.id}`);
        this.setState({ post: res.data });
    }


    renderHTML () {
        return {__html: this.state.post.blogText };
    }

    renderPost() {
        return <div dangerouslySetInnerHTML={this.renderHTML()}></div>;
    }

    render() {
        return (
            <div className="single-post-div">
            <div>{this.renderPost()}</div>
            <div className="single-post-buttons">
                <button className="single-post-first-btn"><i className="fas fa-edit"></i></button>
                <button className="single-post-second-btn"><i className="fas fa-trash-alt"></i></button>
            </div>
            
            </div>
        )
    }
}

export default Post;
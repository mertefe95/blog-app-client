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
        return {__html: this.state.post.blogText};
    }

    renderPost() {
        return <div dangerouslySetInnerHTML={this.renderHTML()}></div>;
    }

    render() {
        return (
            <div>{this.renderPost()}</div>
        )
    }
}

export default Post;
import React from "react";
import Axios from "axios";
import PostListItem from "./PostListItem";


class ViewPosts extends React.Component {
    state = {
        posts: []
    };
    
    componentDidMount() {
        this.getPosts();

    }

    async getPosts() {
        const res = await Axios.get("http://localhost:8080/api/posts")
        this.setState({ posts: res.data });
    }



    renderList() {
        return this.state.posts.map(post => {
            return <PostListItem post={post} key={post._id} />;
        });
        };
    


    render() {
        return (
        <div> {this.renderList()} </div>
        )};
}

export default ViewPosts;
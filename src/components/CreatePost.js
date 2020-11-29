import React from "react";
import Axios from "axios";

class CreatePost extends React.Component {

    state = {
        blogTitle: "",
        blogText: "",
        authorName: ""
    };

    onBlogTitleChange = e => {
        this.setState({
            blogTitle: e.target.value
        });
      };


    onBlogTextChange = e => {
        this.setState({
          blogText: e.target.value
        });
      };
    
    onAuthorNameChange = e => {
        this.setState({
            authorName: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const post = {
            blogTitle: this.state.blogTitle,
            blogText: this.state.blogText,
            authorName: this.state.authorName
        };
        Axios.post("http://localhost:8080/api/posts", post).then(res => console.log(res)).catch(err => console.log(err));  };
    



    render() {
        return(
        <div className="create-post-div">

            <form  className="create-post-form" onSubmit={this.handleSubmit}>

            
                <label htmlFor="post-title">Post Title</label>
                <input value={this.state.blogTitle} onChange={this.onBlogTitleChange}  id="post-title" name="post-title" type="text"></input>
            

                
                <label htmlFor="post-text">Post Text</label>
                <input value={this.state.blogText} onChange={this.onBlogTextChange} id="post-text" name="post-text" type="text"></input> 

                
                <label htmlFor="post-author">Post Authorname</label>
                <input value={this.state.authorName} onChange={this.onAuthorNameChange} id="post-author" name="post-author" type="text"></input>
                
                <button type="submit">Submit</button>

            </form>
        </div>
    )};
}

export default CreatePost;
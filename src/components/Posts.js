import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import ErrorNotice from "../components/misc/ErrorNotice";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';




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

        const useStyles = makeStyles({
            root: {
              minWidth: 275,
            },
            bullet: {
              display: 'inline-block',
              margin: '0 2px',
              transform: 'scale(0.8)',
            },
            title: {
              fontSize: 14,
            },
            pos: {
              marginBottom: 12,
            },
          });
          

          const classes = useStyles();
          const bull = <span className={classes.bullet}>•</span>;
        

    return (
    
    
    <div>
    Welcome to the Viewing all the Blog Posts.
    
    {posts.map((post, key) => (
    <div className="post-div" key={key}>

        <Card className={classes.root}>
        <CardActions>
        <Link to={{
            pathname: `/post/${post._id}`
        }}>


        <h2>{post.blogTitle}</h2>

        </Link>
        </CardActions>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            
        </Typography>
        <Typography variant="h5" component="h2">
            {post.blogText}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            {post.authorName}
        </Typography>

        </CardContent>
    </Card>

        <h4>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        </h4>
        
        { userData.user && userData.user.id === post.userId ? (
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
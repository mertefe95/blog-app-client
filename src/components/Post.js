import React, { useState, useEffect } from "react";
import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Post = (props) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [error, setError] = useState();

useEffect(() => {
    try {
    Axios.get(`https://blog-app-mern-stack.herokuapp.com/api/posts/${props.match.params.id}`)
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
        <Card className={classes.root}>
      
        
        <h2>{blogTitle}</h2>

     
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            
        </Typography>
        <Typography variant="h5" component="h2">
        <h2>{blogText}</h2>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {authorName}
        </Typography>

        </CardContent>
    </Card>

      
        <h4>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        </h4>
        </div>
    );
};

export default Post;
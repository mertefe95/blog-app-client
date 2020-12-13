import React, {useState, useEffect, useContext } from "react";
import { useHistory  } from "react-router-dom";
import Axios from "axios";

import ErrorNotice from "../components/misc/ErrorNotice";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const EditPost = props => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState();


    const history = useHistory();


    const changeOnClick = e => {
        e.preventDefault();

        try {

        const post = {
            blogTitle,
            blogText,
            userId
        };

        setBlogTitle("");
        setBlogText("");
        setUserId("");


        

        Axios
            .put(`https://blog-app-mern-stack.herokuapp.com/api/posts/${props.match.params.id}`, post)
            .then(res => setMessage(res.data))
            .catch(err => {
                console.log(err);
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }}
    
        const useStyles = makeStyles((theme) => ({
            root: {
              '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
              },
            },
          }));
    
        const classes = useStyles();


    return (
        
        <div className="edit-post-page">
            <h1>Update Blog Post</h1>
            <span className="message">{message}</span>
            <h4>
            {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            </h4>


            <form id="edit-post-form" onSubmit={changeOnClick} encType="multipart/form-data"  className={classes.root} noValidate autoComplete="off">    
        <TextField required id="standard-blogTitle-input"
            label="Blog Title"
            type="text"
            autoComplete="current-blogTitle"
            id="blogTitle"
            onChange={e => setBlogTitle(e.target.value)}
        />
        <TextField required id="standard-blogText-input"
            label="Blog Text"
            type="text"
            autoComplete="current-blogText"
            id="blogText"  
            onChange={e => setBlogText(e.target.value)} 
        />
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>


        </form>
</div>


    )
    }
export default EditPost;
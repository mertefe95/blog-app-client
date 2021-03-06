import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom"
import ErrorNotice from "../components/misc/ErrorNotice";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';


const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [verifyMessage, setVerifyMessage] = useState({
    text: undefined,
    });

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));

    const classes = useStyles();

  
    const submit = async (e) => {
    e.preventDefault();

    try {
        const newUser = { username, email, password };
        await Axios.post("https://blog-app-mern-stack.herokuapp.com/api/register", newUser);

        setVerifyMessage({
        text: "Succesful Registration! Please verify your email address before Login.",
        });
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }}

    return (
    <div className="register-page">
        <h2>Register</h2>
        <h3 className="verify-message">{verifyMessage.text}</h3>
        <h4>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        </h4>

<form className="register-form" onSubmit={submit} className={classes.root} noValidate autoComplete="off">
<TextField
        onChange={(e) => setUsername(e.target.value)}
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        
      />

<TextField required id="standard-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          id="register-email"
          onChange={(e) => setEmail(e.target.value)}  
          
        />
<TextField required id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          id="register-password"  
          onChange={(e) => setPassword(e.target.value)}
        />

 <Button variant="contained" color="primary" type="submit">
        Submit
    </Button>

    <Typography className={classes.root}>
    <Link to="/admin-login">
    Admin Login
    </Link>
    <Link to="/forgot-password" >
    Forgot your password?
    </Link>
    </Typography>


    </form>
        </div>
    );
};


export default Register;
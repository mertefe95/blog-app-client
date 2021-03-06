import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom"
import ErrorNotice from "../components/misc/ErrorNotice";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const ChangePassword = ({match}) => {
    const [newPassword, setNewPassword] = useState();
    const [error, setError] = useState();
    const [forgotToken, setForgotToken] = useState();
    const [verifyMessage, setVerifyMessage] = useState({
    text: undefined,
    });


  useEffect(() => {
    try {
  Axios.get(`http://localhost:8080/api/forgot-password/${match.params.forgotToken}`)
  .then(res => [
    setForgotToken(match.params.forgotToken),
    setVerifyMessage({
      text: res.data.msg }),
  ]).catch(err => err.response.data.msg && setError(err.response.data.msg));
  } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
  }
}, []);

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
        const changePw = { newPassword, forgotToken };
        await Axios.post("http://localhost:8080/api/change-password", changePw);

        setVerifyMessage({
        text: "Password has changed, please proceed to login.",
        });
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }}

    return (
    <div className="change-password-page">
        <h2>Change your password!</h2>
        <h3 className="verify-message">{verifyMessage.text}</h3>
        <h4>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        </h4>

<form id="change-password-form" onSubmit={submit} className={classes.root} noValidate autoComplete="off">

<TextField required id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          id="register-password"  
          onChange={(e) => setNewPassword(e.target.value)}
        />

<Button variant="contained" color="primary" type="submit">
  Submit
</Button>
  
    </form>
        </div>
    );
};


export default ChangePassword;
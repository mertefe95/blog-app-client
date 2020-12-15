import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { Link } from "react-router-dom";
import ErrorNotice from ".././components/misc/ErrorNotice";

function UserActivated({ match }) {

  const [error, setError] = useState();
  const [verifyMessage, setVerifyMessage] = useState({
    text: undefined
});

useEffect(() => {
  try {
    Axios.get(`https://blog-app-mern-stack.herokuapp.com/api/activation/${match.params.activationKey}`)
    .then(res => [
      setVerifyMessage({
        text: res.data.msg }),
    ]).catch(err => err.response.data.msg && setError(err.response.data.msg));
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
  }, []);


  return (
    <div className="user-activated-page">
    <h2>User Activation</h2>

    <h4> {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />} </h4>

    <h3>{verifyMessage.text}</h3>
    <h4>{verifyMessage.text ? ( <Link to="/login">Please proceed to Login</Link> ) : (  <> </> ) }</h4> 
  
</div>
  )
}

export default UserActivated

import React, { useState} from "react";

import Axios from "axios";

import ErrorNotice from "./misc/ErrorNotice";


const ForgotPassword = () => {

    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const [verifyMessage, setVerifyMessage] = useState({
        text: undefined
    });


    const submit = async (e) => {
        e.preventDefault();

        try {
        const currentUser = { email  };
        await Axios.post(
            "http://localhost:8080/api/forgot-password", 
            currentUser
        );

        await setVerifyMessage({
            text: "Please check your email for password change."
        })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }

    }


return (
<div className="page">
    <h2>Forgot Password</h2>

    <h4>Please enter your email for password change.</h4>

    <h4> {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />} </h4>

    <h3>{verifyMessage.text}</h3>

    <form className="form" onSubmit={submit}>

        <label htmlFor="forgot-email">Email</label>
        <input id="forgot-email" type="email" onChange={e => setEmail(e.target.value)} />


        <button type="submit">Submit</button>
    </form>
</div>

)
}
export default ForgotPassword;

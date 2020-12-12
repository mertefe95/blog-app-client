import React, { useState } from "react";
import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice";


const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [verifyMessage, setVerifyMessage] = useState({
    text: undefined,
    });

    const submit = async (e) => {
    e.preventDefault();

    try {
        const newUser = { username, email, password };
        await Axios.post("http://localhost:8080/api/register", newUser);

        setVerifyMessage({
        text: "Please verify your email to proceed login.",
        });
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }}

    return (
    <div className="register-page">
        <h2>Register</h2>
        <h3>{verifyMessage.text}</h3>
        <h4>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        </h4>
        <form className="register-form" onSubmit={submit}>
        <label htmlFor="register-username">Username</label>
        <input
            id="register-username"
            type="username"
            onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="register-email">Email</label>
        <input
            id="register-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
            id="register-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
        </form>
        </div>
    );
};


export default Register;
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";
import UserContext from "../context/UserContext";
import ErrorNotice from "../components/misc/ErrorNotice";

const AdminLogin = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();


    const { setUserData } = useContext(UserContext);
    const history = useHistory();


    const submit = async (e) => {
        
        e.preventDefault();

        try {
        const loginAdmin = { email, password };
        const loginRes = await Axios.post(
            "http://localhost:8080/api/login", 
                loginAdmin
            );

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }


return (
<div className="admin-login-page">
    <h2>Admin Login</h2>

    <h4>{error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )} </h4>


    <form className="admin-login-form" onSubmit={submit}>

        <label htmlFor="login-email">Admin Email</label>
        <input id="login-email" type="email" onChange={e => setEmail(e.target.value)} />

        <label htmlFor="login-password">Admin Password</label>
        <input id="login-password" type="password" onChange={e => setPassword(e.target.value)} />

        <button type="submit">Submit</button>

    </form>
</div>
)}


export default AdminLogin;

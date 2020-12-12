import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";
import UserContext from "../context/UserContext";
import ErrorNotice from "../components/misc/ErrorNotice";



const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [verifyMessage, setVerifyMessage] = useState({
        text: undefined
    });

    const { setUserData } = useContext(UserContext);
    const history = useHistory();


    const submit = async (e) => {
        
        e.preventDefault();

        try {

        const loginUser = { email, password };
        const loginRes = await Axios.post(
            "http://localhost:8080/api/login", 
                loginUser);

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
<div className="login-page">
    <h2>Login</h2>

    <h3>{verifyMessage.text}</h3>

    <h4>{error && <ErrorNotice message={error} clearError={() => setError(undefined)} />} </h4>


    <form className="login-form" onSubmit={submit}>

        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" onChange={e => setEmail(e.target.value)} />

        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" onChange={e => setPassword(e.target.value)} />

        <button type="submit">Submit</button>

        <ul>
            <li><Link to="/forgot-password">Forgot your password?</Link></li>
            <li><Link to="/admin-login">Login as Admin</Link></li>
        </ul>
    </form>
</div>

)
}
export default Login;

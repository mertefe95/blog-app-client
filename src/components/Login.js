import React, {useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";


function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    
    const submit = async (e) => {
        e.preventDefault();
        const loginUser = {email, password };

        const loginRes = await Axios.post(
            "https://blog-app-mern-stack.herokuapp.com/api/login", 
            loginUser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } 
    

        return( 
            <div className="register-form-div">
                <form className="register-form" onSubmit={submit}>
                        <h2>Login</h2>


                        <label htmlFor="email">Email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="register-email" type="email" id="email" name="email"></input>

                        <label htmlFor="password">Password:</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="register-password" type="password" id="password" name="password"></input>

                        <button type="submit" className="register-btn">Submit</button>

                </form>

            </div>
        )
        };
    

export default Login;
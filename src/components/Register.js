import React, {useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";


function Register() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();


    const submit = async (e) => {
        e.preventDefault();
        const newUser = {email, password, username};

       
        await Axios.post(
            "https://blog-app-mern-stack.herokuapp.com/api/register", 
            newUser
            );
        const loginRes = await Axios.post("https://blog-app-mern-stack.herokuapp.com/api/login",{
            email,
            username,
            password,
        });

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/api");
        };

        return( 
            <div className="register-form-div">
                <form className="register-form" onSubmit={submit}>
                        <h2>Register</h2>


                        <label htmlFor="username" >Username:</label>
                        <input  onChange={(e) => setUsername(e.target.value)} className="register-username" type="text" id="username" name="username"></input>

                        <label htmlFor="email">Email:</label>
                        <input  onChange={(e) => setEmail(e.target.value)} className="register-email" type="email" id="email" name="email"></input>

                        <label htmlFor="password">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} className="register-password" type="password" id="password" name="password"></input>

                        <button type="submit" className="register-btn">Submit</button>

                        

                </form>


            </div>
        )
        };
    



export default Register;
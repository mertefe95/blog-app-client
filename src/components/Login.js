import React, {useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice"
import { useFormik } from "formik";

const initialValues = {
    email: '',
    password: ''
}

const onSubmit = values => {
    console.log('Form data', values)
}

const validate = values => {
    // values.email values.name values.channel
    let errors = {}
    const digit = /^(?=.*\d)/
    const upperLetter = /^(?=.*[A-Z])/

    if(!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Password should be more than 8 characters.'
    } else if (!digit.test(values.password)) {
        errors.password = 'Password must have a number.'
    } else if (!upperLetter.test(values.password)) {
        errors.password = 'Password must have one uppercase letter.'
    } 

    if(!values.email) {
        errors.email = 'Required'
    }

    return errors
}


function Login() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })


    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    

    console.log('Form data', formik.values)
    console.log('Form errors', formik.errors)
    
    /*
    const submit = async (e) => {
        e.preventDefault();

        try {
        const loginUser = {email, password};

        const loginRes = await Axios.post(
            "http://localhost:8080/api/login", 
            loginUser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.error && setError(err.response.data.error);
        }
        } 
        */
    

        return( 
            
                <form className="login-form" onSubmit={formik.handleSubmit}>
                        <h2>Login</h2>
                        
                        <div className="form-control">
                        <label htmlFor="email">Email:</label>
                        <input 
                            value={formik.values.email} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} 
                            className="login-email" 
                            type="email" 
                            id="email" 
                            name="email">    
                        </input>
                        {formik.errors.username ? <div className="error">{formik.errors.username} </div> : null}
                        </div>


                        <div className="form-control">
                        <label htmlFor="password">Password:</label>
                        <input 
                            value={formik.values.password} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} 
                            className="login-password" 
                            type="password" 
                            id="password" 
                            name="password">
                        </input>
                        {formik.errors.password ? <div className="error">{formik.errors.email} </div> : null}
                        </div>

                        <div className="form-control">
                        <button type="submit" className="login-btn">Submit</button>
                        </div>

                        <div className="form-control">
                        <Link to="/forgot-password">Forgot your password? Click here.</Link>
                        </div>
                </form>

 
        )
        };
    

export default Login;
import React, {useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice"
import { useFormik } from 'formik';


const initialValues = {
        username: '',
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

    if(!values.username) {
        errors.username = 'Required'
    }

    if(!values.password) {
        errors.password = 'Required'
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


function Register() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    console.log('Form data', formik.values)

    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

/*
    const submit = async (e) => {
        e.preventDefault();

        try {
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
            history.push("/");
        }
        catch (err) {
            err.response.data.error && setError(err.response.data.error);
        }
        };

        */


        return( 



                <form className="register-form" onSubmit={formik.handleSubmit}>
                        <h2>Register</h2>
                        {error && (
                            <ErrorNotice message={error} clearError={() => setError(undefined)} />
                        
                        )}

                        <label htmlFor="username" >Username:</label>
                        <input  
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="register-username" 
                            type="text" 
                            id="username" 
                            name="username"
                            value={formik.values.username}>
                        </input>

                        <label htmlFor="email">Email:</label>
                        <input  
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="register-email" 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formik.values.email}>
                        </input>

                        <label htmlFor="password">Password:</label>
                        <input 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            className="register-password" 
                            type="password" 
                            id="password" 
                            name="password"
                            value={formik.values.password}>
                        </input>

                        <button type="submit" className="register-btn">Submit</button>


                </form>
                   
        )
        };
    



export default Register;
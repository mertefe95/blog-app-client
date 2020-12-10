import React, {useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const initialValues = {
    email: '',
    password: '',
    error: ''
}

const onSubmit = values => {
    console.log('Form data', values)

    } 

    /* 
    e.preventDefault();

    try {
    const loginUser = {email, password};

    const loginRes = Axios.post(
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

    }*/

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Required!'),
    password: Yup.string()
        .required('Required!')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )

})


function Login() {

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    
    /*
    const submit = async (e) => {
    
        */
    

        return(  
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                <Form className="login-form" >
                        <h2>Login</h2>
            
                        <div className="form-control">
                        <label htmlFor="email">Email:</label>
                        <Field 
                            className="login-email" 
                            type="email" 
                            id="email" 
                            name="email">    
                        </Field>
                        <ErrorMessage name="email" />
                        </div>


                        <div className="form-control">
                        <label htmlFor="password">Password:</label>
                        <Field 
                            className="login-password" 
                            type="password" 
                            id="password" 
                            name="password">
                        </Field>
                        <ErrorMessage name="password" />
                        </div>

                        <div className="form-control">
                        <button type="submit" className="login-btn">Submit</button>
                        </div>

                        <div className="form-control">
                        <Link to="/forgot-password">Forgot your password? Click here.</Link>
                        </div>
                </Form>
                </Formik>

        )
        };
    

export default Login;
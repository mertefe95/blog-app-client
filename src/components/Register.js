import React, {useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const initialValues = {
        username: '',
        email: '',
        password: ''
}

const onSubmit = async (e) => {
    e.preventDefault();
    
        try {
            const email = initialValues.email
            const password = initialValues.password
            const username = initialValues.username

            const newUser = {email, password, username};

        await Axios.post(
            "http://localhost:8080/api/register", 
            newUser
            );
        const loginRes = await Axios.post("http://localhost:8080/api/login",{
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

}

const regEx = /^(?=.*[A-Z])(?=.*\d)(?=.{8,})/



const validationSchema = Yup.object({ 

    username: Yup.string().required('Required!'),
    email: Yup.string()
        .email('Invalid email format.')
        .required('Required'),

    
    password: Yup.string()
        .required('Required!')
        .matches(
            regEx,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
        .min(8)
})

function Register() {

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

/*
    const submit = async (e) => {
        
        }
        };

        */

        return( 
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit} >
                <Form className="register-form" >
                        <h2>Register</h2>

                        <div className="form-control">
                        <label htmlFor="username" >Username:</label>
                        <Field  
                            
                            className="register-username" 
                            type="text" 
                            id="username" 
                            name="username"

                        />
                        <ErrorMessage name="username" />
                        </div>

                        <div className="form-control">
                        <label htmlFor="email">Email:</label>
                        <Field  

                            className="register-email" 
                            type="email" 
                            id="email" 
                            name="email"
                        />
                        <ErrorMessage name="email" />
                        </div>

                        <div className="form-control">
                        <label htmlFor="password">Password:</label>
                        <Field 

                            className="register-password" 
                            type="password" 
                            id="password" 
                            name="password"
                        />                      
                        <ErrorMessage name="password" />
                        </div>

                        <button type="submit" className="register-btn">Submit</button>


                </Form>
                </Formik>
        )
        };
    



export default Register;
import React, {useState} from "react";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
    blogTitle: Yup.string()
            .required('Required.'),
    blogText: Yup.string()
            .required('Required.'),
    authorName: Yup.string()
            .required('Required')
});


const onSubmit = values => {
    console.log('Form data', values)
}


const CreatePost = () => {
    const [message, setMessage] = useState('');

    const changeOnClick = e => {
        e.preventDefault();

        const post = {
            blogTitle,
            blogText,
            authorName   
        };

        setBlogTitle("");
        setBlogText("");
        setAuthorName("");

        Axios.post('http://localhost:8080/api/posts', post)
        .then(res => setMessage(res.data))
        .catch(err => {
            console.log(err);
        })
    };


    const initialValues = {
        blogTitle: '',
        blogText: '',
        authorName: ''
    }

    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
    <Form encType="multipart/form-data" className="create-post-form">
        <h2>Create Post</h2>
        <span className="message-edit">{message}</span>

        <label htmlFor="blogTitle">Blog Title:</label>
        <Field type="text" id="blogTitle" name="blogTitle" />
        <ErrorMessage name="blogTitle" />

        <label htmlFor="blogText">Blog Text:</label>
        <Field type="text" id="blogText" name="blogText" />
        <ErrorMessage name="blogText" />

        <label htmlFor="authorname">Author Name:</label>
        <Field type="text" id="authorName" name="authorName" />
        <ErrorMessage name="authorName" />

        <button type="submit">Submit</button>
    </Form>
    </Formik>
)
}

export default CreatePost;
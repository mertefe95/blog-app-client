import React, {useState, useEffect} from "react";
import Axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik"; 
import * as Yup from "yup";

const EditPost = props => {

    const initialValues = {
        blogTitle: '',
        blogText: '',
        authorName: ''
    }

    const validationSchema = Yup.object({
        blogTitle: Yup.string() 
                    .required('Required'),
        blogText: Yup.string()
                    .required('Required'),
        authorName: Yup.string()
                    .required('Required')
    })

    const [message, setMessage] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        const post = {
            blogTitle,
            blogText,
            authorName   
        };

        setBlogTitle("");
        setBlogText("");
        setAuthorName("");

        Axios.put(`http://localhost:8080/api/posts/${props.match.params.id}`, post)
            .then(res => setMessage(res.data))
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        Axios.get(`http://localhost:8080/api/posts/${props.match.params.id}`)
        .then(res => [
            setBlogTitle(res.data.blogTitle),
            setBlogText(res.data.blogText),
            setAuthorName(res.data.authorName)
        ])
        .catch(error => console.log(error));
    }, []);


    return (
    <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit} >

    <Form encType="multipart/form-data" className="edit-post-form">
        <h2>Edit Post</h2>
        <span className="message-edit">{message}</span>
        <label htmlFor="blogTitle">Blog Title:</label>
        <Field type="text" id="blogTitle" name="blogTitle" />
        <ErrorMessage name="blogTitle" />

        <label htmlFor="blogText">Blog Text:</label>
        <Field type="text" id="blogText" name="blogText" />
        <ErrorMessage name="blogText" />

        <label htmlFor="authorName">Author Name:</label>
        <Field type="text" id="authorName" name="authorName" />
        <ErrorMessage name="authorName" />

        <button type="submit">Submit</button>
    </Form>
    </Formik>
)
}

export default EditPost;
import React from "react";
import Axios from "axios";


class Register extends React.Component {

    state = {
        username: "",
        email: "",
        password: ""
    };


    onUsernameChange = e => {
        this.setState({
            username: e.target.value
        });
    };

    onEmailChange = e => {
        this.setState({
            email: e.target.value
        });
    };

    onPasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        Axios.post("https://blog-app-mern-stack.herokuapp.com/api/register", user).then(res => console.log(res)).catch(err => console.log(err)); };

    render() {
        return( 
            <div className="register-form-div">
                <form className="register-form" onSubmit={this.handleSubmit}>

                        <label htmlFor="username" >Username:</label>
                        <input value={this.state.username} onChange={this.onUsernameChange} className="register-username" type="text" id="username" name="username"></input>

                        <label htmlFor="email">Email:</label>
                        <input value={this.state.email} onChange={this.onEmailChange} className="register-email" type="email" id="email" name="email"></input>

                        <label htmlFor="password">Password:</label>
                        <input value={this.state.password} onChange={this.onPasswordChange} className="register-password" type="password" id="password" name="password"></input>

                        <button type="submit" className="register-btn">Submit</button>


                </form>


            </div>
        )
        };
    
}

export default Register;
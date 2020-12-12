import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext); 

    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => { 
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", ""); 
    }
    return (
        <nav className="auth-options">
        { userData.user ? (
            <li><Link to="/create-post">CREATE A POST</Link></li>,
            <li><button onClick={logout}>Logout</button> </li>
        ) : (
            <>
                <li><button onClick={register}>Register</button></li>
                <li><button onClick={login}>Login</button></li>
            </>
        )}


        </nav>
        
    );
}

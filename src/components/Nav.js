import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

function Nav() {
    
    const {userData, setUserData} = useContext(UserContext);


    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };

    return (
        <nav className="nav">
            <div className="nav-first-div">
                <h2 className="nav-first-h">Blog App</h2>
            </div>

                {
                userData.user ? (

                <ul className="nav-ul">
                <li className="nav-li-first"><a  href="/">VIEW POSTS</a></li>
                <li className="nav-li-second"><a  href="/create-post">CREATE A POST</a></li>
                <li className="nav-li-fourth"><button onClick={logout}>LOGOUT</button></li>
                <li className="nav-li-fifth"><a href="/my-profile">MY PROFILE</a></li>
                </ul>
                ) : (
                <>
                <ul className="nav-ul">
                <li className="nav-li-first"><a  href="/">VIEW POSTS</a></li>
                <li className="nav-li-second"><a  href="/create-post">CREATE A POST</a></li>
                <li className="nav-li-third"><button onClick={register}>REGISTER</button></li>
                <li className="nav-li-fourth"><button onClick={login}>LOGIN</button></li>
                </ul>
                </>
                )}

            

        </nav>
    );

}

export default Nav;
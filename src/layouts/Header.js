import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../components/misc/AuthOptions";

function Header() {

    return (
        <nav className="nav">
            <Link to="/">
                <h1>Blog App!</h1>
            </Link>

            <ul>    
                <li><Link to="/create-post">CREATE A POST</Link></li>
                <li><AuthOptions /></li>
            </ul>
        </nav>
    );

}

export default Header;
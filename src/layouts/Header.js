import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../components/misc/AuthOptions";

function Header() {

    return (
        <header className="header">
            <Link className="header-h1" to="/">
                <h1>BLOG APP!</h1>
            </Link>

            
            <AuthOptions />
        
        </header>
    );

}

export default Header;
import React from "react";


function Nav() {
    return (
        <nav className="nav">
            <div className="nav-first-div">
                <h2 className="nav-first-h">Blog App</h2>
            </div>

            <ul className="nav-ul">
                <li className="nav-li-first"><a href="/">VIEW POSTS</a></li>
                <li className="nav-li-second"><a href="/createpost">CREATE A POST</a></li>
            </ul>

        </nav>
    );

}

export default Nav;
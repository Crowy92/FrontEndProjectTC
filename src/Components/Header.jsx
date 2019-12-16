import { Link } from "@reach/router";

import React from 'react';

const Header = (props) => {
    return (
        <div>
            <div className="navigation">
                <div className="dropdown">
                    <Link to="/">
                        <button className="pagebtn-large">
                            <p >Home</p>
                        </button>
                    </Link>
                    {props.user && <Link to="/postarticle">
                        <button className="pagebtn-large">
                            <p >Post Article</p>
                        </button>
                    </Link>}
                </div>
                {props.user ? <p className="loginDone">Logged in as: <Link to="/user">{props.user}</Link></p> : <p className="loginPrompt">Login for more features</p>}
            </div>
        </div >
    );
};

export default Header;
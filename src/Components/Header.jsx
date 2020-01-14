import { Link } from "@reach/router";

import React from 'react';

const Header = (props) => {
    const { user, signIn } = props;

    const handleclick = () => {
        signIn("")
    }

    return (
        <div>
            <div className="navigation">
                <div className="dropdown">
                    <Link to="/">
                        <button className="pagebtn-large">
                            Home
                        </button>
                    </Link>
                    {user && <Link to="/postarticle">
                        <button className="pagebtn-large">
                            New Article
                        </button>
                    </Link>}
                    {user === "grumpy19" && <Link to="/posttopic">
                        <button className="pagebtn-large">
                            Add Topic
                        </button>
                    </Link>}
                </div>
                {user ? <p className="loginDone">Logged in as: <Link to="/user">{user}</Link></p> : <p className="loginPrompt">Login for more features - e.g. "tickle122"</p>}
                {user && <button className="pagebtn-large" onClick={handleclick}>
                    Log out
                        </button>}
            </div>
        </div >
    );
};

export default Header;
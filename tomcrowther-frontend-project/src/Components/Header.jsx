import { Link } from "@reach/router";
import React, { Component } from 'react';

class Header extends Component {
    state = {
        username: "",
        isLoggedIn: false,
        sort_by: "",
        topic: ""
    }

    render() {
        return (
            <div>
                <div className="navigation">
                    <div className="dropdown">
                        <Link to="/">
                            <button className="pagebtn-large">
                                <p >Home</p>
                            </button>
                        </Link>
                    </div>
                    {this.props.user ? <p className="loginDone">Logged in as: <Link to="/user">{this.props.user}</Link></p> : <p className="loginPrompt">Login for more features</p>}
                </div>
            </div >
        );
    }
}

export default Header;
import React, { Component } from 'react';

class Userlogin extends Component {
    state = {
        username: ""
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { username } = this.state;
        const userChecker = this.props.users.map(user => {
            return user.username;
        })
        console.log(userChecker)
        if (userChecker.includes(username)) this.props.signIn(username)
        else {
            alert('User does not exist')
        }
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type="text" placeholder="username" />
                <input className="pagebtn" type="submit" value="Login"></input>
            </form>
        );
    }
}

export default Userlogin;
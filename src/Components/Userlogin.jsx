import React, { Component } from 'react';

class Userlogin extends Component {
    state = {
        username: ""
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { username } = this.state;
        localStorage.setItem('username', username)
        const userChecker = this.props.users.map(user => {
            return user.username;
        })
        if (userChecker.includes(username)) this.props.signIn(username)
        else {
            alert('User does not exist')
        }
        this.setState({ username: "" })
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.username} onChange={this.handleChange} type="text" placeholder="username" />
                <input className="pagebtn" type="submit" value="Login"></input>
            </form>
        );
    }
}

export default Userlogin;
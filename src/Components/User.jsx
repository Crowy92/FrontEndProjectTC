import React from 'react';

const User = (props) => {
    const { users, user } = props
    const currentUser = users.filter(item => item.username === user)[0]
    console.log(currentUser, user)

    if (currentUser) {

        return (
            <div className="container">
                <h1>{currentUser.username}</h1>
                <h2>{currentUser.name}</h2>
                <img alt="user-avatar" className="pic" src={currentUser.avatar_url}></img>
            </div>
        );
    }
    return (
        <h2>Login To view User Profile</h2>
    )
};

export default User;
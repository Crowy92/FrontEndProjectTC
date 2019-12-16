import React from 'react';

const ErrorDisplay = (props) => {
    const { err } = props
    if (!err) {
        return (
            <div>
                <h1>Error</h1>
                <p>{500}</p>
                <p>{"Something went wrong"} </p>
            </div>
        );
    }
    return (
        <div>
            <h1>Error</h1>
            <p>{err.status || 500}</p>
            <p>{err.msg || "Something went wrong"} </p>
        </div>
    );
};

export default ErrorDisplay;
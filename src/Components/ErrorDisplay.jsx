import React from 'react';

const ErrorDisplay = (props) => {
    const { err } = props
    return (
        <div>
            <p>{err.status || 500}</p>
            <p>{err.msg || "Something went wrong"} </p>
        </div>
    );
};

export default ErrorDisplay;
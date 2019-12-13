import React from 'react';

const ErrorDisplay = (err) => {
    return (
        <div>
            <p>{err.status}</p>
            <p>{err.msg}</p>
        </div>
    );
};

export default ErrorDisplay;
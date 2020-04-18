import React from 'react';

function Welcome(props) {
    return (
        <Fragment>
            <h1>Smart Face</h1>
            <h2>A smart face recognition app</h2>
            <button onClick={() => props.handleViewChange('login')}>Login</button>
            <button onClick={() => props.handleViewChange('register')}>Register</button>
        </Fragment>
    )
}

export default Welcome;
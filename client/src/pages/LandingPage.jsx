// LandingPage.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const LandingPage = ({user}) => {
    if (user) {
        return <Navigate to="/home" ></Navigate>
    }

    return (
        <div>
            <h1>Welcome to NoExpiry!</h1>
        </div>
    );
}

export default LandingPage;

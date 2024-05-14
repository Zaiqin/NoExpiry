import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = ({ user }) => {
    console.log("eepycar")
    if (user) {
        console.log("eepycars")
        return <Navigate to="/home" />;
    } else {
        return <Navigate to="/" />;
    }
};

export default NotFound;
import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = ({ user }) => {
    if (user) {
        return <Navigate to="/home" />;
    } else {
        return <Navigate to="/" />;
    }
};

export default NotFound;
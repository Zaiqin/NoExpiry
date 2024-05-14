import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.currentUser ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;

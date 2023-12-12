import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../utils/Auth';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/signup" />
        )
      }
    />
  );
};

export default ProtectedRoute;
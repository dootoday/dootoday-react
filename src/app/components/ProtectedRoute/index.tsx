/**
 *
 * ProtectedRoute
 *
 */
import React from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { IsAuthenticated } from 'utils/auth';
import { LandingPage } from 'app/containers/LandingPage';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={props => {
        if (IsAuthenticated()) {
          return <Component {...props} />;
        } else {
          if (location.pathname === '/') {
            return <LandingPage />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location.pathname },
                }}
              />
            );
          }
        }
      }}
    />
  );
};

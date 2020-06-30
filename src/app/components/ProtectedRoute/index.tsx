/**
 *
 * ProtectedRoute
 *
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsAuthenticated } from 'utils/auth';

export function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (IsAuthenticated()) {
          return <Component {...props} />;
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
      }}
    />
  );
}

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { PrivatePaths } from './index';
import Auth from '../utils/auth';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const content = Auth.isAuthenticated() ? (
          <Redirect
            to={{
              pathname: PrivatePaths.ASSESSMENT,
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        );
        return content;
      }}
    />
  );
};

export default PublicRoute;

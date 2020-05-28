import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { PublicPaths } from './index';
import Auth from '../utils/auth';
import store from '../redux/store';
import { SET_CURRENT_BUSINESS } from '../redux/business/actionTypes';

const PrivateRoute = ({ component: Component, render, shouldRedirect, ...rest }) => {
  const isAuthenticated = Auth.isAuthenticated();
  const currentBusiness = Auth.getCurrentBusiness();
  if (isAuthenticated && !!currentBusiness) {
    store.dispatch({
      type: SET_CURRENT_BUSINESS,
      payload: currentBusiness,
    });
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        const content = isAuthenticated ? (
          !!render ? (
            <>{render()}</>
          ) : (
            <Component {...props} />
          )
        ) : shouldRedirect !== false ? (
          <Redirect
            to={{
              pathname: PublicPaths.LOGIN,
              state: { from: props.location },
            }}
          />
        ) : null;
        return content;
      }}
    />
  );
};

export default PrivateRoute;

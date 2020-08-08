import React, { useState } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { makeStyles } from '@material-ui/styles';

import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import history from './history';
import Login from '../views/Login';
import Register from '../views/Register';
import SideBar from '../components/SideBar';
import NavHeader from '../components/NavHeader';
import UserProfile from '../views/UserProfile';
import AddBusiness from '../views/AddBusiness';
import Business from '../views/Business';
import ErrorPage from '../views/ErrorPage';
import ServerError from '../views/ServerError';
import VerifyUser from '../views/VerifyUser';

export const PublicPaths = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  ERROR_UNAUTHORIZED: '/unathorized',
  SERVER_ERROR: '/server-error',
  VERIFY_USER: '/verify/:id',
};

// const publicRoutes = [
//   { path: PublicPaths.LOGIN, exact: true, component: Login },
//   { path: PublicPaths.REGISTER, exact: true, component: Register },
// ];

export const PrivatePaths = {
  OVERVIEW: '/overview',
  INVESTORS: '/investors',
  RETURNS: '/returns',
  INVESTMENTS: '/investments',
  SETTINGS: '/settings',
  MY_PROFILE: '/my-profile',
  CREATE_PLATFORM: '/my-profile/create-platform',
  BUSINESS: '/platform/:platformId',
};

const privateRoutes = [
  { path: PrivatePaths.MY_PROFILE, exact: true, component: UserProfile },
  { path: PrivatePaths.CREATE_PLATFORM, exact: false, component: AddBusiness },
  { path: PrivatePaths.BUSINESS, exact: false, component: Business },
];

const Routes = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  // let {
  //   match: { path },
  // } = props;
  const classes = useStyles();

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <Layout className={classes.container}>
      <Router history={history}>
        <Switch>
          <PrivateRoute
            path="/"
            component={(props) => <NavHeader toggle={toggle} collapsed={collapsed} {...props} />}
            shouldRedirect={false}
          />
        </Switch>
        <Switch>
          <Route path={PublicPaths.VERIFY_USER} exact component={VerifyUser} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path={PublicPaths.ERROR_UNAUTHORIZED} exact render={() => <ErrorPage />} />
          <Route path={PublicPaths.SERVER_ERROR} exact render={() => <ServerError />} />
        </Switch>
        <Switch>
          <Layout className="site-layout" style={{ height: '100%' }}>
            <Switch>
              <PrivateRoute
                path="/"
                component={(props) => <SideBar collapsed={collapsed} toggle={toggle} {...props} />}
                shouldRedirect={false}
              />
            </Switch>
            {privateRoutes.map((route) => {
              return (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                />
              );
            })}
            <Route exact path="/" render={() => <Redirect to="/my-profile" />} />
          </Layout>
          {/* <Redirect to="/my-profile" /> */}
        </Switch>
      </Router>
    </Layout>
  );
};

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    height: '100vh',
  },
});

export default React.memo(Routes);

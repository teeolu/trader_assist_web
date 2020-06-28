import React, { useState } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { makeStyles } from '@material-ui/styles';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import history from './history';
import Investors from '../views/investors';
import Login from '../views/Login';
import Register from '../views/Register';
import SideBar from '../components/SideBar';
import NavHeader from '../components/NavHeader';
import { boxShadows, colors } from '../Css';
import Overview from '../views/overview';
import Returns from '../views/returns';
import Investments from '../views/investments';
import Settings from '../views/settings';

export const PublicPaths = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
};

const publicRoutes = [
  { path: PublicPaths.LOGIN, exact: true, component: Login },
  { path: PublicPaths.REGISTER, exact: true, component: Register },
];

export const PrivatePaths = {
  OVERVIEW: '/overview',
  INVESTORS: '/investors',
  RETURNS: '/returns',
  INVESTMENTS: '/investments',
  SETTINGS: '/settings',
};

const privateRoutes = [
  { path: PrivatePaths.INVESTORS, exact: false, component: Investors },
  { path: PrivatePaths.OVERVIEW, exact: false, component: Overview },
  { path: PrivatePaths.RETURNS, exact: false, component: Returns },
  { path: PrivatePaths.INVESTMENTS, exact: false, component: Investments },
  { path: PrivatePaths.SETTINGS, exact: false, component: Settings },
];

const Routes = () => {
  const [collapsed, setCollapsed] = useState(false);
  const classes = useStyles();

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <Layout className={classes.container}>
      <Router history={history}>
        <Switch>
          <Layout className="site-layout">
            <PrivateRoute
              path="/"
              component={(props) => <NavHeader toggle={toggle} collapsed={collapsed} {...props} />}
              shouldRedirect={false}
            />
          </Layout>
        </Switch>
        <Switch>
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/register" exact render={() => <Register />} />
        </Switch>
        <Switch>
          <Layout className="site-layout">
            <Switch>
              <PrivateRoute
                path="/"
                component={(props) => <SideBar collapsed={collapsed} toggle={toggle} {...props} />}
                shouldRedirect={false}
              />
            </Switch>
            <Route exact path="/" render={() => <Redirect to="/overview" />} />
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
          </Layout>
          <Redirect to={PublicPaths.LOGIN} />
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

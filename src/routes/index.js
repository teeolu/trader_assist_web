import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { makeStyles } from '@material-ui/styles';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import history from './history';
import Overview from '../views/overview';
import Login from '../views/Login';
import Register from '../views/Register';
import SideBar from '../atoms/SideBar';
import NavHeader from '../atoms/NavHeader';
import { boxShadows, colors } from '../Css';

const { Content } = Layout;

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
};

const privateRoutes = [{ path: PrivatePaths.INVESTORS, exact: false, component: Overview }];

const Routes = () => {
  const classes = useStyles();

  return (
    <Layout className={classes.container}>
      <Router history={history}>
        <Switch>
          <PrivateRoute
            path="/"
            component={(props) => <SideBar {...props} />}
            shouldRedirect={false}
          />
        </Switch>
        <Switch>
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Register />} />
        </Switch>
        <Switch>
          <Layout className="site-layout">
            <PrivateRoute
              path="/"
              component={(props) => <NavHeader {...props} />}
              shouldRedirect={false}
            />
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                height: 'calc(100% - 48px)',
                border: boxShadows.border,
              }}>
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
            </Content>
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

import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { makeStyles } from '@material-ui/styles';

import history from './history';
import Overview from '../views/Overview';
import Login from '../views/Login';
import Register from '../views/Register';

const Routes = () => {
  const classes = useStyles();

  return (
    <Layout className={classes.container}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/overview" />} />
          <Route path="/overview" render={() => <Overview />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Register />} />
        </Switch>
      </Router>
    </Layout>
  );
};

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
  },
});

export default React.memo(Routes);

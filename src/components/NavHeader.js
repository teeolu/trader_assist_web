import React from 'react';
import { Layout } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { fontsize, boxShadows } from '../Css';

const { Header } = Layout;

const NavHeader = () => {
  const classes = useStyles();

  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, borderBottom: boxShadows.border }}></Header>
  );
};

const useStyles = makeStyles({
  menuItem: {
    borderRadius: 5,
    padding: '17px 30px',
    border: 'none',
    height: 'auto',
    width: 'auto',
    marginTop: 20,
  },
  menuIcon: {
    fontSize: fontsize.h4,
  },
});

export default NavHeader;

import React from 'react';
import { Layout, Avatar } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import { fontsize, boxShadows, typography } from '../Css';
import { getCurrentBusinessState } from '../redux/business/addBusinessReducer';

const { Header } = Layout;

const NavHeader = () => {
  const classes = useStyles();
  const currentBusiness = useSelector(getCurrentBusinessState);

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        borderBottom: boxShadows.border,
        display: 'flex',
        alignItems: 'center',
      }}>
      <Avatar
        src={currentBusiness.businessImage.secure_url}
        size="large"
        style={{ marginLeft: 20 }}
      />
      <p style={{ ...typography.h4, marginBottom: 0, marginLeft: 10 }}>
        {currentBusiness.businessName}
      </p>
    </Header>
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

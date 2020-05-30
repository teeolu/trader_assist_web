import React from 'react';
import { Layout, Avatar, Row, Col, Button } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import { fontsize, boxShadows, typography, colors } from '../Css';
import { getCurrentBusinessState } from '../redux/business/addBusinessReducer';
import { BellOutlined, WechatOutlined, MailOutlined } from '@ant-design/icons';

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
      }}>
      <Row gutter={20}>
        <Col
          span={12}
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 30,
          }}>
          <Avatar
            src={currentBusiness.businessImage.secure_url}
            size="large"
            style={{ border: `1px solid ${colors.gray}` }}
          />
          <p style={{ ...typography.h4, marginBottom: 0, marginLeft: 10 }}>
            {currentBusiness.businessName}
          </p>
        </Col>
        <Col
          span={12}
          juti
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 30,
          }}>
          <Button style={{ margin: '0 5px' }} shape="circle">
            <BellOutlined size="large" style={{ fontSize: fontsize.h4, color: colors.pink }} />
          </Button>
          <Button style={{ margin: '0 5px' }} shape="circle">
            <WechatOutlined style={{ fontSize: fontsize.h4, color: colors.pink }} />
          </Button>
          <Button style={{ margin: '0 5px' }} shape="circle">
            <MailOutlined style={{ fontSize: fontsize.h4, color: colors.pink }} />
          </Button>
        </Col>
      </Row>
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

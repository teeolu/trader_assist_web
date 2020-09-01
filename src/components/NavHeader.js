import React from 'react';
import { Layout, Avatar, Row, Col, Button, Badge } from 'antd';
import { useSelector } from 'react-redux';
import { BellOutlined, WechatOutlined, MailOutlined } from '@ant-design/icons';

import { fontsize, boxShadows, typography, colors } from '../Css';
import { getCurrentBusinessState } from '../redux/business/addBusinessReducer';
import SearchBox from './SearchBox';

const { Header } = Layout;

const NavHeader = () => {
  const currentBusiness = useSelector(getCurrentBusinessState);

  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background header"
        style={{
          padding: 0,
          borderBottom: boxShadows.border,
          display: 'flex',
          alignItems: 'center',
        }}>
        <Row
          style={{
            width: '100%',
          }}
          gutter={20}>
          <Col
            span={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingRight: 30,
            }}>
            <Button style={{ margin: '0 5px' }} shape="circle">
              <Badge style={{ backgroundColor: colors.pinkDark }} count={1}>
                <BellOutlined size="large" style={{ fontSize: fontsize.h4, color: colors.pink }} />
              </Badge>
            </Button>
            <Button style={{ margin: '0 5px' }} shape="circle">
              <WechatOutlined style={{ fontSize: fontsize.h4, color: colors.pink }} />
            </Button>
            <Button style={{ margin: '0 5px' }} shape="circle">
              <MailOutlined style={{ fontSize: fontsize.h4, color: colors.pink }} />
            </Button>
            <SearchBox />
          </Col>
          <Col
            span={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingLeft: 30,
            }}>
            <p style={{ ...typography.h4, marginBottom: 0, marginLeft: 10 }}>
              {currentBusiness.platformName}
            </p>
            <Avatar
              src={
                !!currentBusiness.businessImage ? currentBusiness.businessImage.secure_url : null
              }
              size="large"
              style={{ border: `1px solid ${colors.gray}`, marginLeft: 20, marginRight: 20 }}
            />
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

export default NavHeader;

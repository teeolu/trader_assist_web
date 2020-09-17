import React from 'react';
import { Layout, Avatar, Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import { boxShadows, typography, colors } from '../Css';
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
            <Avatar
              src={
                !!currentBusiness.platformImage ? currentBusiness.platformImage.secure_url : null
              }
              size="large"
              style={{ border: `1px solid ${colors.gray}`, marginLeft: 20, marginRight: 20 }}
            />
            <p style={{ ...typography.h4, marginBottom: 0 }}>{currentBusiness.platformName}</p>
          </Col>
          <Col
            span={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              // paddingLeft: 30,
            }}>
            <SearchBox />
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

export default NavHeader;

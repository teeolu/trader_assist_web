import React from 'react';
import { Layout, Row, Col } from 'antd';

import SearchBox from './SearchBox';

const { Header } = Layout;

const NavHeader = () => {
  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background header"
        style={{
          padding: 0,
          display: 'flex',
        }}>
        <Row
          style={{
            width: '100%',
            justifyContent: 'flex-end',
          }}
          gutter={20}>
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

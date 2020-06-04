import React from 'react';
import { Layout, Row, Col, Card } from 'antd';

import './index.css';
import PlatformActivities from './PlatformActivities';
import OverviewCalendar from './Calendar';

const { Content } = Layout;

const Overview = () => {
  return (
    <Content
      style={{
        margin: '24px 16px',
      }}>
      <Row gutter={24}>
        <Col span={16}>
          <Card bodyStyle={{ padding: 15 }}>
            <OverviewCalendar />
          </Card>
        </Col>
        <Col span={8} style={{}}>
          <Card
            bodyStyle={{ padding: 0 }}
            style={{
              minHeight: 600,
              position: 'sticky',
              backgroundColor: 'transparent',
              top: 20,
            }}>
            <Card
              bodyStyle={{ padding: 15 }}
              style={{
                minHeight: 200,
              }}>
              <PlatformActivities />
            </Card>
            <Card
              style={{
                minHeight: 200,
                marginTop: 20,
              }}></Card>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Overview;

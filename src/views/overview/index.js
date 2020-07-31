import React, { useState, useRef } from 'react';
import { Layout, Row, Col, Card } from 'antd';

import './index.css';
import PlatformActivities from './PlatformActivities';
import OverviewCalendar from './Calendar';
// import CalendarDateDetails from './CalendarDateDetails';

const { Content } = Layout;

const Overview = () => {
  const [dateToShowDetails, setDateToShowDetail] = useState(null);
  const calendarDetailContainerRef = useRef();

  return (
    <Content>
      <Row gutter={0}>
        <Col span={17}>
          <Card bodyStyle={{ padding: 15 }}>
            <OverviewCalendar showDateDetails={(date) => setDateToShowDetail(date)} />
          </Card>
        </Col>
        <Col span={7} style={{}}>
          <Card
            bodyStyle={{ padding: 0 }}
            style={{
              height: 'calc(100vh - 64px)',
              position: 'sticky',
              backgroundColor: 'transparent',
              top: 0,
            }}>
            <Card
              bodyStyle={{ padding: 0 }}
              style={{
                height: 'calc(100vh - 64px)',
              }}>
              <div
                ref={calendarDetailContainerRef}
                className="site-drawer-render-in-current-wrapper">
                <PlatformActivities />
                {/* <CalendarDateDetails dateToShowDetails={dateToShowDetails} /> */}
              </div>
            </Card>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Overview;

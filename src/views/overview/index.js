import React, { useState, useRef } from 'react';
import { Layout, Row, Col, Card } from 'antd';

import './index.css';
import OverviewCalendar from './Calendar';
import CalendarDateReturns from './CalendarDateReturn';
import { typography, colors, boxShadows } from '../../Css';

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
          <div
            style={{
              height: 'calc(100vh - 64px)',
              position: 'sticky',
              backgroundColor: colors.white,
              top: 0,
            }}>
            {!!dateToShowDetails ? (
              <CalendarDateReturns dateToShowDetails={dateToShowDetails} />
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 0,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  fontSize: '1.3em',
                  height: '100%',
                  textAlign: 'center',
                  color: colors.pinkDark,
                }}>
                <p style={{ width: '80%', borderBottom: boxShadows.border, paddingBottom: 15 }}>
                  Click on a date in the calendar to see all the returns and investment for the day
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default Overview;

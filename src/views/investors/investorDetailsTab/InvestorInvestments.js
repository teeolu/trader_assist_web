import React, { useState } from 'react';
import { Tabs, List, Tooltip, Button, Collapse, Card, Badge } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { CaretRightOutlined } from '@ant-design/icons';

import { colors, fontsize, boxShadows, typography, fonts } from '../../../Css';
import Buttons from '../../../atoms/Buttons';

const { Panel } = Collapse;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const InvestorInvestments = () => {
  const classes = useStyles();

  return (
    <>
      <Card bordered={true} bodyStyle={{ padding: 15 }}>
        <h4
          style={{
            ...typography.paragraph,
            fontWeight: 600,
            letterSpacing: 1,
            color: colors.black,
          }}>
          NGN290,000 <span style={{ ...typography.caption }}>on tues, 24th May, 2020</span>
        </h4>
        <p style={{ marginBottom: 10 }}>This investment was confirmed by Sola</p>
        <div
          style={{
            display: 'flex',
          }}>
          <div
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              marginRight: 20,
            }}>
            <p>Number of returns</p>
            <p style={{ ...typography.h2, color: colors.blue }}>0</p>
          </div>
          <div
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              paddingLeft: 20,
              borderLeft: `1px solid ${colors.gray}`,
            }}>
            <p>Returns sum</p>
            <p style={{ ...typography.h2, color: colors.pinkDark }}>0</p>
          </div>
        </div>
        <Collapse
          bordered={false}
          accordion={true}
          expandIconPosition="right"
          style={{ margin: 0, padding: 0, marginTop: 10, backgroundColor: colors.white }}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              style={{ fontSize: '1.2rem', color: colors.pinkDark }}
              color={colors.pinkDark}
              rotate={isActive ? 90 : 0}
            />
          )}
          className="site-collapse-custom-collapse">
          <Panel
            style={{ margin: 0, padding: 0 }}
            header={<p style={{ color: colors.pinkDark }}>See returns</p>}
            key="1"
            className="site-collapse-custom-panel">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div style={{ display: 'flex' }}>
                        <p>
                          {item.title}
                          <span
                            style={{
                              ...typography.captionMedium,
                              border: `1px solid ${colors.gray}`,
                              borderRadius: 5,
                              padding: '3px 5px',
                              color: colors.gray,
                              marginLeft: 10,
                              display: 'inline-block',
                            }}>
                            undue
                          </span>
                        </p>
                      </div>
                    }
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </Card>
    </>
  );
};

const useStyles = makeStyles({});

export default InvestorInvestments;

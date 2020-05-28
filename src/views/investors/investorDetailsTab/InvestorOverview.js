import React, { useState } from 'react';
import { Tabs, Input, Tooltip, Button, Menu, Card } from 'antd';
import { makeStyles } from '@material-ui/styles';

import { colors, fontsize, boxShadows, typography, fonts } from '../../../Css';
import Buttons from '../../../atoms/Buttons';

const { TabPane } = Tabs;

const InvestorOverview = () => {
  const classes = useStyles();

  return (
    <>
      <Card bordered={false} bodyStyle={{ padding: 15 }}>
        <h4
          style={{
            ...typography.paragraph,
            fontWeight: 600,
            letterSpacing: 1,
            color: colors.black,
          }}>
          Investments
        </h4>
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
            <p>Number of investments</p>
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
            <p>Investments sum</p>
            <p style={{ ...typography.h2, color: colors.pinkDark }}>0</p>
          </div>
        </div>
      </Card>
      <Card bordered={false} bodyStyle={{ padding: 15 }} style={{ marginTop: 20 }}>
        <h4
          style={{
            ...typography.paragraph,
            fontWeight: 600,
            letterSpacing: 1,
            color: colors.black,
          }}>
          Investments
        </h4>
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
      </Card>
    </>
  );
};

const useStyles = makeStyles({});

export default InvestorOverview;

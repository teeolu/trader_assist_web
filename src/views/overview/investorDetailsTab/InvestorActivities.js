import React, { useState } from 'react';
import { Tabs, List, Tooltip, Button, Collapse, Card, Badge } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { CaretRightOutlined } from '@ant-design/icons';

import { colors, fontsize, boxShadows, typography, fonts } from '../../../Css';
import Activities from '../../../components/Activities';

const InvestorActivities = () => {
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
          Activities
        </h4>
        <Activities />
      </Card>
    </>
  );
};

const useStyles = makeStyles({});

export default InvestorActivities;

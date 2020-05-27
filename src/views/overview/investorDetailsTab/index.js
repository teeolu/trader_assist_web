import React, { useState } from 'react';
import { Tabs, Input, Tooltip, Button, Menu } from 'antd';
import { makeStyles } from '@material-ui/styles';

import { colors, fontsize, boxShadows, typography, fonts } from '../../../Css';
import Buttons from '../../../atoms/Buttons';
import './investorDetailsTabCss.css';
import InvestorOverview from './InvestorOverview';
import InvestorInvestments from './InvestorInvestments';
import InvestorActivities from './InvestorActivities';

const { TabPane } = Tabs;

const InvestorDetailsTab = () => {
  const classes = useStyles();

  return (
    <div className="card-container" style={{ marginTop: 50 }}>
      <Tabs
        type="card"
        tabBarStyle={{
          color: colors.black2,
          fontWeight: 600,
        }}>
        <TabPane tab="Investor overview" key="1">
          <InvestorOverview />
        </TabPane>
        <TabPane tab="Investment" key="2">
          <InvestorInvestments />
        </TabPane>
        <TabPane tab="Activities" key="3">
          <InvestorActivities />
        </TabPane>
      </Tabs>
    </div>
  );
};

const useStyles = makeStyles({});

export default InvestorDetailsTab;

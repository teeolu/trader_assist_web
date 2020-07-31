import React from 'react';
import { Tabs } from 'antd';

import { colors } from '../../../Css';
import './investorDetailsTabCss.css';
import InvestorOverview from './InvestorOverview';
import InvestorInvestments from './InvestorInvestments';
import InvestorActivities from './InvestorActivities';

const { TabPane } = Tabs;

const InvestorDetailsTab = ({ investor }) => {
  // const classes = useStyles();

  return (
    <div className="card-container" style={{ marginTop: 50 }}>
      <Tabs
        type="card"
        tabBarStyle={{
          color: colors.black2,
          fontWeight: 600,
        }}>
        <TabPane tab="Investor overview" key="1">
          <InvestorOverview investor={investor} />
        </TabPane>
        <TabPane tab="Investment" key="2">
          <InvestorInvestments investor={investor} />
        </TabPane>
        <TabPane tab="Activities" key="3">
          <InvestorActivities investor={investor} />
        </TabPane>
      </Tabs>
    </div>
  );
};

// const useStyles = makeStyles({});

export default InvestorDetailsTab;

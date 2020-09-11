import React from 'react';
import { Card } from 'antd';

import { colors, typography } from '../../../Css';

const InvestorOverview = ({ investor }) => {
  // const classes = useStyles();
  const {
    meta,
    // numberOfInvestment, numberOfReturns, returnsSum
  } = investor;

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
            <p style={{ ...typography.h2, color: colors.blue }}>{meta.numberOfInvestment}</p>
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
            <p style={{ ...typography.h3, color: colors.pinkDark }}>
              NGN{meta.investmentTotal.toLocaleString()}
            </p>
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
          Returns
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
            <p style={{ ...typography.h2, color: colors.blue }}>{meta.numberOfReturns}</p>
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
            <p style={{ ...typography.h3, color: colors.pinkDark }}>
              NGN{meta.returnsTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

// const useStyles = makeStyles({});

export default InvestorOverview;

import React, { useState } from 'react';
import { Layout, Input, Tooltip, Button, Menu } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { PlusSquareOutlined } from '@ant-design/icons';

import { colors, fontsize, boxShadows, typography, fonts } from '../../Css';
import Buttons from '../../atoms/Buttons';
import InvestorDetails from './InvestorDetail';
const { Search } = Input;

const Overview = () => {
  const classes = useStyles();

  function renderInvestorsList(params) {
    return (
      <div className={classes.inventorListContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((investor, i) => {
          const isActive = i === 1;
          return (
            <div
              key={investor}
              style={{
                backgroundColor: isActive ? colors.pinkLight : 'transparent',
                borderLeft: `3px solid ${isActive ? colors.pinkDark : 'transparent'}`,
              }}>
              <div className={classes.investorIsActiveIndicator}>
                an
                <div
                  style={{
                    backgroundColor: colors.green,
                  }}></div>
              </div>
              <div className={classes.investorInfo}>
                <p style={{ ...typography.paragraph, fontFamily: fonts.semiBold, marginBottom: 0 }}>
                  Adewole Damilola
                </p>
                <p style={{ ...typography.paragraph, marginBottom: 0 }}>
                  Added on tuesday, 13 2020
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes.overviewContainer}>
      <div className={classes.investors}>
        <div className={classes.investorsHeading}>
          <p className={classes.investorText}>
            <b>Investors</b>
          </p>
          <div>
            <Tooltip title="Add investor" placement="bottom">
              <Button
                type="primary"
                shape="circle"
                style={{ backgroundColor: colors.pinkLight, border: 'none' }}
                icon={
                  <PlusSquareOutlined style={{ color: colors.pinkDark, fontSize: fontsize.h4 }} />
                }
              />
            </Tooltip>
          </div>
        </div>
        <div className={classes.investorsHeading}>
          <Search
            placeholder="Search investors"
            loading={false}
            onSearch={(value) => console.log(value)}
            style={{ width: '100%' }}
          />
        </div>
        {renderInvestorsList()}
      </div>
      <InvestorDetails />
    </div>
  );
};

const useStyles = makeStyles({
  overviewContainer: {
    display: 'flex',
    height: '100%',
  },
  investors: {
    flex: 3,
    height: '100%',
    width: '100%',
    borderRight: boxShadows.border,
    display: 'flex',
    flexDirection: 'column',
  },
  investorsHeading: {
    padding: 15,
    width: '100%',
    height: 50,
    borderBottom: boxShadows.border,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  investorText: {
    ...typography.h4,
    marginBottom: 0,
    fontWeight: 600,
    color: colors.black2,
    letterSpacing: '1px',
  },
  inventorListContainer: {
    height: '100%',
    overflowY: 'scroll',
    '& > div': {
      padding: 15,
      cursor: 'pointer',
      display: 'flex',
      '&:not(:last-child)': {
        borderBottom: boxShadows.border,
      },
    },
  },
  investorInfo: {
    marginTop: 5,
    marginLeft: 10,
  },
  investorIsActiveIndicator: {
    ...typography.paragraphGray,
    fontFamily: fonts.regular,
    fontSize: fontsize.h3,
    height: 60,
    width: 60,
    borderRadius: 5,
    backgroundColor: colors.gray3,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    '& div': {
      height: 15,
      width: 15,
      borderRadius: 10,
      border: `3px solid ${colors.white}`,
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
  },
});

export default Overview;

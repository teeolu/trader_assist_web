import React, { useState } from 'react';
import { Layout, Input, Tooltip, Button, Menu } from 'antd';
import { makeStyles } from '@material-ui/styles';

import { colors, fontsize, boxShadows, typography, fonts } from '../../Css';
import Buttons from '../../atoms/Buttons';
import InvestorDetailsTab from './investorDetailsTab';
import { PrivatePaths } from '../../routes';
import history from '../../routes/history';

const InvestorDetails = (props) => {
  const classes = useStyles();
  // let {
  //   match: { path, params },
  // } = props;
  // console.log('params.investorId params.investorId ', params);

  return (
    <div
      style={{
        padding: '50px 100px 50px 50px',
      }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: 100, width: 100, backgroundColor: colors.gray }}></div>
        </div>
        <div style={{ flex: 3 }}>
          <p
            style={{
              ...typography.paragraph,
              fontFamily: fonts.semiBold,
              fontSize: '1.5rem',
              lineHeight: 1.4,
              marginBottom: 5,
              fontWeight: 600,
              color: colors.black,
            }}>
            Adewole Damilola
          </p>
          <p
            style={{
              lineHeight: 1.4,
              fontWeight: 400,
              marginBottom: 5,
              fontWeight: 600,
            }}>
            <span
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.green,
                display: 'inline-block',
                marginRight: 10,
              }}></span>
            NGN190,000 - sum of active investment
          </p>
          <p
            style={{
              ...typography.caption,
              color: colors.black2,
              marginBottom: 0,
              fontWeight: 600,
            }}>
            No previous returns yet
          </p>
          <p
            style={{
              ...typography.caption,
              color: colors.black2,
              marginBottom: 5,
              fontWeight: 600,
            }}>
            Next return is in two days
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Buttons
              btnText="Add investment"
              onClick={() => history.push(`${PrivatePaths.INVESTORS}/new-investment/dhbjdhbd`)}
              size="small"
              textColor={colors.pinkDark}
              textStyle={{}}
              style={{
                padding: '7px 10px',
                backgroundColor: 'transparent',
                border: `1px solid ${colors.pinkDark}`,
              }}
            />
            <Buttons
              btnText="Edit"
              size="small"
              onClick={() => history.push(`${PrivatePaths.INVESTORS}/edit-investor/dhbjdhbd`)}
              textColor={colors.blue}
              textStyle={{}}
              style={{
                padding: '7px 10px',
                backgroundColor: 'transparent',
                border: `1px solid ${colors.blue}`,
                marginLeft: 10,
              }}
            />
          </div>
        </div>
      </div>
      <InvestorDetailsTab />
    </div>
  );
};

const useStyles = makeStyles({
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
  investorInfo: {
    marginTop: 5,
    marginLeft: 10,
  },
});

export default InvestorDetails;

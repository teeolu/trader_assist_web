import React from 'react';
import { Row, Col } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';

import { colors, fontsize, typography, fonts } from '../Css';
import history from '../routes/history';
import { existInUrl } from '../utils/url';

const colorPairs = ['#f8b703', '#0fa2a9', '#949217', '#7d3865', '#d7743b'];

export default ({ investor, url }) => {
  const isActive = existInUrl(investor.investorId) === investor.investorId;
  const bgColor = colorPairs[Math.floor(Math.random() * Math.floor(5))];
  const classes = useStyles();
  return (
    <div
      className={classes.investorContainer}
      onClick={() => history.push(`${url}/${investor.investorId}`)}
      style={{
        backgroundColor: isActive && colors.gray3,
      }}>
      <div
        style={{
          backgroundColor: bgColor,
          color: colors.white,
        }}
        className={classes.investorIsActiveIndicator}>
        {investor.investorFullName[0]}
        <div
          style={{
            backgroundColor: investor.meta.numberOfInvestment > 0 ? colors.green : colors.red,
          }}></div>
      </div>
      <div className={classes.investorInfo}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={16}>
            <p
              style={{
                marginBottom: 0,
                color: colors.black,
                textTransform: 'capitalize',
                fontSize: '1.2em',
              }}>
              {investor.investorFullName}
            </p>
          </Col>
          <Col span={8}>
            <Row justify="space-around">
              <Col span={12} style={{ ...typography.caption }}>
                {investor.meta.numberOfInvestment} <VerticalAlignBottomOutlined />
              </Col>
              <Col span={12} style={{ ...typography.caption }}>
                {investor.meta.numberOfReturns} <VerticalAlignTopOutlined />
              </Col>
            </Row>
          </Col>
        </Row>
        <p style={{ ...typography.caption, marginBottom: 0 }}>Added on tuesday, 13 2020</p>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  investorContainer: {
    transition: '.3s all',
    backgroundColor: 'transparent',
    padding: 15,
    '&:hover': {
      backgroundColor: colors.gray2,
    },
  },
  investorInfo: {
    marginLeft: 10,
    width: '100%',
  },
  investorIsActiveIndicator: {
    ...typography.paragraphGray,
    fontFamily: fonts.regular,
    fontSize: fontsize.h4,
    height: 40,
    width: 40,
    borderRadius: 56,
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
      bottom: -2,
      right: -2,
    },
  },
});

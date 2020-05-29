import React, { useState, useEffect } from 'react';
import { Layout, Input, Tooltip, Button, Menu, notification, Spin, Space } from 'antd';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Switch } from 'react-router-dom';

import {
  getIsFetchingState,
  getInvestorsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investor/getInvestorsReducer';
import { colors, fontsize, boxShadows, typography, fonts } from '../../Css';
import InvestorDetails from './InvestorDetail';
import PrivateRoute from '../../routes/PrivateRoute';
import AddInvestor from './AddInvestor';
import history from '../../routes/history';
import EditInvestor from './EditInvestor';
import AddInvestment from './AddInvestment';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { getCurrentBusinessState } from '../../redux/business/addBusinessReducer';
const { Search } = Input;

const Investors = (props) => {
  let {
    match: { path },
  } = props;
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investorsData = useSelector(getInvestorsState);
  const currentBusiness = useSelector(getCurrentBusinessState);

  useEffect(() => {
    fetchInvestors();
  }, []);

  useEffect(() => {
    if (status === Status.GET_INVESTORS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  useEffect(() => {
    if (props.location.pathname === path && investorsData.size !== null) {
      history.push(`${path}/${investorsData.investors[0]._id}`);
    }
  }, [investorsData]);

  function fetchInvestors(search = '') {
    Api.InvestorRepository.getInvestors({
      params: {
        search,
        businessId: currentBusiness._id,
      },
    });
  }
  const classes = useStyles();

  function renderInvestorsList() {
    return (
      <div className={classes.inventorListContainer}>
        {investorsData.investors.map((investor, i) => {
          const idFromParam = !!props.location.pathname.split(`${path}/`)[1]
            ? props.location.pathname.split(`${path}/`)[1].split('/')[0]
            : null;
          const isActive = investor._id === idFromParam;
          return (
            <div
              key={investor._id}
              className={classes.investorContainer}
              onClick={() => history.push(`${path}/${investor._id}`)}
              style={{
                backgroundColor: isActive && colors.pinkLight,
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
                  {investor.fullName}
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
                onClick={() => history.push(`${path}/new-investor`)}
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
        {isFetching && investorsData.size === null && (
          <Space
            style={{
              width: '100%',
              minHeight: 300,
              justifyContent: 'center',
            }}>
            <Spin />
          </Space>
        )}
        {renderInvestorsList()}
      </div>
      <div className={classes.investorsDetail}>
        <Switch>
          <PrivateRoute path={`${path}/new-investor`} exact={true} component={AddInvestor} />
          <PrivateRoute path={`${path}/:investorId`} exact={true} component={InvestorDetails} />
          <PrivateRoute
            path={`${path}/:investorId/new-investment`}
            exact={true}
            component={AddInvestment}
          />
          <PrivateRoute
            path={`${path}/:investorId/edit-investor`}
            exact={true}
            component={EditInvestor}
          />
        </Switch>
      </div>
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
  investorContainer: {
    transition: '.3s all',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: colors.gray2,
    },
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
  investorsDetail: {
    flex: 5,
    height: '100%',
    width: '100%',
    backgroundColor: colors.white,
    overflowY: 'scroll',
  },
});

export default Investors;

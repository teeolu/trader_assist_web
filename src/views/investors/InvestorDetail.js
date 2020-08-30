import React, { useEffect } from 'react';
import { Space, Spin, notification } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import userAvatar from '../../assets/images/user.png';

import {
  // getIsFetchingState as getIsFetchingReturnState,
  getInvestorReturnsState,
  getErrorMessageState as getReturnsErrorMessageState,
  getStatusState as getReturnStatusState,
  Status as ReturnStatus,
} from '../../redux/investor/getInvestorReturnReducer';

import {
  getCurrentInvestorState,
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investor/getInvestorReducer';
import { colors, typography, fonts } from '../../Css';
import Buttons from '../../atoms/Buttons';
import InvestorDetailsTab from './investorDetailsTab';
import history from '../../routes/history';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { generatePreviousReturn, generateNextReturns } from '../../utils/returnsUtils';

const InvestorDetails = (props) => {
  const classes = useStyles();
  let {
    match: {
      params: { investorId },
      url,
    },
  } = props;

  const investor = useSelector(getCurrentInvestorState);
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);

  const investorsReturns = useSelector(getInvestorReturnsState);
  // const returnIsFetching = useSelector(getIsFetchingReturnState);
  const returnErrorMsg = useSelector(getReturnsErrorMessageState);
  const returnStatus = useSelector(getReturnStatusState);

  const {
    investorFullName,
    investmentSum,
    meta,
    // numberOfReturns,
    // returnsSum,
    // createdAt,
    // _id,
  } = investor[investorId] || {};

  useEffect(() => {
    if (investorId) {
      fetchInvestor();
      fetchInvestorReturns();
    }
    // eslint-disable-next-line
  }, [investorId]);

  useEffect(() => {
    if (status === Status.GET_INVESTOR_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  useEffect(() => {
    if (returnStatus === ReturnStatus.GET_INVESTOR_RETURNS_REQUEST_FAILURE) {
      notification['error']({
        message: returnErrorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [returnStatus]);

  function fetchInvestor() {
    Api.InvestorRepository.getInvestor({
      investorId,
      params: {},
    });
  }

  function fetchInvestorReturns() {
    Api.InvestorRepository.getInvestorReturns({
      params: {
        investorId,
      },
    });
  }

  return (
    <div
      style={{
        padding: '50px 100px 50px 50px',
      }}>
      {!!investorFullName ? (
        <>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div className={classes.avatarContainer}>
                <img src={userAvatar} alt="User" />
              </div>
            </div>
            <div style={{ flex: 3 }}>
              <p className={classes.investorFullname}>{investorFullName}</p>
              <p className={classes.activeInvestment}>
                <span
                  style={{
                    backgroundColor: meta.numberOfInvestment > 0 ? colors.green : colors.red,
                  }}></span>
                NGN{meta.investmentTotal.toLocaleString()} - sum of active investment
              </p>
              <p className={classes.prevReturn}>
                {!!investorsReturns[investorId] &&
                  generatePreviousReturn(investorsReturns[investorId].data)}
              </p>
              <p className={classes.nextReturn}>
                {!!investorsReturns[investorId] &&
                  generateNextReturns(investorsReturns[investorId].data)}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Buttons
                  btnText="Add investment"
                  onClick={() => history.push(`${url}/new-investment`)}
                  size="small"
                  textColor={colors.pinkDark}
                  style={{
                    padding: '7px 10px',
                    backgroundColor: 'transparent',
                    border: `1px solid ${colors.pinkDark}`,
                  }}
                />
                <Buttons
                  btnText="Edit"
                  size="small"
                  onClick={() => history.push(`${url}/edit-investor`)}
                  textColor={colors.blue}
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
          <InvestorDetailsTab investor={investor[investorId]} />
        </>
      ) : isFetching ? (
        <Space
          style={{
            width: '100%',
            minHeight: 300,
            justifyContent: 'center',
          }}>
          <Spin />
        </Space>
      ) : null}
    </div>
  );
};

const useStyles = makeStyles({
  avatarContainer: {
    height: 100,
    width: 100,
    backgroundColor: colors.gray,
    '& img': { height: '100%' },
  },
  investorFullname: {
    ...typography.paragraph,
    fontFamily: fonts.semiBold,
    fontSize: '1.5rem',
    lineHeight: 1.4,
    marginBottom: 5,
    fontWeight: 600,
    color: colors.black,
  },
  activeInvestment: {
    lineHeight: 1.4,
    marginBottom: 5,
    fontWeight: 600,
    '& span': {
      height: 10,
      width: 10,
      display: 'inline-block',
      marginRight: 10,
    },
  },
  prevReturn: {
    ...typography.caption,
    color: colors.black2,
    marginBottom: 0,
    fontWeight: 600,
  },
  nextReturn: {
    ...typography.caption,
    color: colors.black2,
    marginBottom: 5,
    fontWeight: 600,
  },
});

export default InvestorDetails;

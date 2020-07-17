import React, { useEffect } from 'react';
import { Space, Spin, notification } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import userAvatar from '../../assets/images/user.png';

import {
  getIsFetchingState as getIsFetchingReturnState,
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
import { colors, boxShadows, typography, fonts } from '../../Css';
import Buttons from '../../atoms/Buttons';
import InvestorDetailsTab from './investorDetailsTab';
import { PrivatePaths } from '../../routes';
import history from '../../routes/history';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { generatePreviousReturn, generateNextReturns } from '../../utils/returnsUtils';

const InvestorDetails = (props) => {
  // const classes = useStyles();
  let {
    match: {
      params: { investorId },
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
    fullName,
    investmentSum,
    numberOfInvestment,
    // numberOfReturns,
    // returnsSum,
    // createdAt,
    _id,
  } = investor[investorId] || {};

  useEffect(() => {
    if (investorId) {
      fetchInvestor();
      fetchInvestorReturns();
    }
  }, [investorId]);

  useEffect(() => {
    if (status === Status.GET_INVESTOR_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  useEffect(() => {
    if (returnStatus === ReturnStatus.GET_INVESTOR_RETURNS_REQUEST_FAILURE) {
      notification['error']({
        message: returnErrorMsg,
        ...notificationConfigs,
      });
    }
  }, [returnStatus]);

  function fetchInvestor() {
    Api.InvestorRepository.getInvestor({
      params: {
        investorId,
      },
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
      {!!fullName ? (
        <>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: colors.gray,
                }}>
                <img src={userAvatar} alt="User" style={{ height: '100%' }} />
              </div>
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
                {fullName}
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
                    backgroundColor: numberOfInvestment > 0 ? colors.green : colors.red,
                    display: 'inline-block',
                    marginRight: 10,
                  }}></span>
                NGN{investmentSum.toLocaleString()} - sum of active investment
              </p>
              <p
                style={{
                  ...typography.caption,
                  color: colors.black2,
                  marginBottom: 0,
                  fontWeight: 600,
                }}>
                {!!investorsReturns[investorId] &&
                  generatePreviousReturn(investorsReturns[investorId].data)}
              </p>
              <p
                style={{
                  ...typography.caption,
                  color: colors.black2,
                  marginBottom: 5,
                  fontWeight: 600,
                }}>
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
                  onClick={() => history.push(`${PrivatePaths.INVESTORS}/${_id}/new-investment`)}
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
                  onClick={() => history.push(`${PrivatePaths.INVESTORS}/${_id}/edit-investor`)}
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

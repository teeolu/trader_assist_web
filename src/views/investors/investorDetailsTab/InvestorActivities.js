import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Activities from '../../../components/Activities';
import {
  // getIsFetchingState,
  getInvestorHistoryState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../../redux/investor/getInvestorHistoryReducer';
import { Api } from '../../../repository/Api';
import { Card, notification } from 'antd';
import { notificationConfigs } from '../../../constants/ToastNotifincation';

const InvestorActivities = ({ investor }) => {
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investorsHistory = useSelector(getInvestorHistoryState);
  // const classes = useStyles();

  useEffect(() => {
    fetchInvstorHistory();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status === Status.GET_INVESTORS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  function fetchInvstorHistory() {
    Api.InvestorRepository.getInvestorHistory({
      params: {
        investorId: investor.investorId,
      },
    });
  }

  // console.log(
  //   'investorsHistory[investor.investorId] investorsHistory[investor.investorId] ',
  //   investorsHistory[investor.investorId],
  // );

  return (
    <>
      <Card bordered={true} bodyStyle={{ padding: 15 }}>
        <Activities activities={investorsHistory[investor.investorId]} />
      </Card>
    </>
  );
};

// const useStyles = makeStyles({});

export default InvestorActivities;

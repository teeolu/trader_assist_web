import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import Activities from '../../../components/Activities';
import {
  getIsFetchingState,
  getInvestorHistoryState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../../redux/investor/getInvestorHistoryReducer';
import { Api } from '../../../repository/Api';
import { Card } from 'antd';

const InvestorActivities = ({ investor }) => {
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investorsHistory = useSelector(getInvestorHistoryState);
  const classes = useStyles();

  useEffect(() => {
    fetchBusinessHistory();
  }, []);

  useEffect(() => {
    if (status === Status.GET_INVESTORS_REQUEST_FAILURE) {
    }
  }, [status]);

  function fetchBusinessHistory() {
    Api.InvestorRepository.getInvestorHistory({
      params: {
        investorId: investor._id,
      },
    });
  }

  // console.log(
  //   'investorsHistory[investor._id] investorsHistory[investor._id] ',
  //   investorsHistory[investor._id],
  // );

  return (
    <>
      <Card bordered={true} bodyStyle={{ padding: 15 }}>
        <Activities activities={investorsHistory[investor._id]} />
      </Card>
    </>
  );
};

const useStyles = makeStyles({});

export default InvestorActivities;
import React, { useEffect } from 'react';
import { notification, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { colors, boxShadows } from '../../../Css';
import {
  getInvestorInvestmentsState,
  getErrorMessageState,
  getStatusState,
  getIsFetchingState,
  Status,
} from '../../../redux/investor/getInvestorInvestmentReducer';
import { notificationConfigs } from '../../../constants/ToastNotifincation';
import { Api } from '../../../repository/Api';
import { sortBaseOnTime } from '../../../utils/time';
import InvestmentsItems from '../../../components/InvestmentsItems';
import InvestorInvestmentReturns from '../../../components/InvestorInvestmentReturns';
import Loading from '../../../atoms/Loading';

const InvestorInvestments = ({ investor }) => {
  const investorId = investor.investorId;
  const classes = useStyles();
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investorsInvestmentsData = useSelector(getInvestorInvestmentsState);

  useEffect(() => {
    fetchInvestorInvestment();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status === Status.GET_INVESTOR_INVESTMENT_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  function fetchInvestorInvestment() {
    Api.InvestorRepository.getInvestorInvestment({
      params: {
        investorId,
      },
    });
  }

  return (
    <div>
      <Row key={1} gutter={0} className={classes.tableHead}>
        <Col span={15}>
          <p style={{ color: colors.black, width: '80%', margin: 0 }}>Investment ref</p>
        </Col>
        <Col span={3}>Amount</Col>
        <Col span={3}>Status</Col>
        <Col span={3}>Confirmed</Col>
      </Row>
      {isFetching && <Loading marginTop={20} />}
      {!!investorsInvestmentsData.investments[investorId]
        ? sortBaseOnTime(investorsInvestmentsData.investments[investorId]).map((investment, i) => {
            return (
              <div key={investment.investmentId}>
                <InvestorInvestmentReturns
                  investment={investment}
                  investorId={investorId}
                  renderInvestment={() => <InvestmentsItems investment={investment} />}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};

const useStyles = makeStyles({
  activeRow: {
    backgroundColor: colors.pinkLight,
  },
  tableHead: {
    padding: 20,
    borderBottom: boxShadows.border,
    transition: '.3s all',
  },
  activitiesRow: {
    padding: 20,
    borderBottom: boxShadows.border,
    cursor: 'pointer',
    transition: '.3s all',
    '&:hover': { backgroundColor: colors.gray3 },
  },
});

export default InvestorInvestments;

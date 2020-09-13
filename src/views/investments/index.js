import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DatePicker, Layout, Row, Col, Card, notification } from 'antd';
import { makeStyles } from '@material-ui/styles';

import {
  // getIsFetchingState,
  getInvestmentsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investment/getInvestmentsReducer';
import { colors, typography, boxShadows } from '../../Css';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import InvestmentDetails from './InvestmentsDetail';
import { sortBaseOnTime } from '../../utils/time';
import InvestmentsItems from '../../components/InvestmentsItems';
import Pagination from '../../atoms/Pagination';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const Investments = (props) => {
  let { location } = props;
  const classes = useStyles();

  const [queryParams, setQueryParams] = useState({
    dateFrom: null,
    dateTo: null,
    page: 1,
    limit: 10,
  });
  const urlParams = new URLSearchParams(location.search);
  const searchInvestmentId = urlParams.get('investmentId');

  // const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investments = useSelector(getInvestmentsState);

  useEffect(() => {
    fetchInvestments();
    // eslint-disable-next-line
  }, [queryParams]);

  useEffect(() => {
    if (status === Status.GET_INVESTMENTS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  function fetchInvestments() {
    Api.InvestmentRepository.getInvesments({
      params: queryParams,
    });
  }

  function handleDateFilter(_, dateString) {
    setQueryParams((prevState) => ({
      ...prevState,
      dateFrom: dateString[0],
      dateTo: dateString[1],
    }));
  }

  function handlePaginationChange(pageNumber) {
    setQueryParams((prevState) => ({
      ...prevState,
      page: pageNumber,
    }));
  }

  function renderTable() {
    const dataSource = !!investments ? sortBaseOnTime(investments.data) : [];
    return dataSource.map((investment, i) => {
      const investmentId = investment.investmentId;

      return (
        <Link to={`${location.pathname}?investmentId=${investmentId}`}>
          <InvestmentsItems investment={investment} />
        </Link>
      );
    });
  }

  return (
    <Content>
      <Row gutter={0}>
        <Col span={17}>
          <Card style={{ minHeight: 'calc(100vh - 64px)' }} bodyStyle={{ padding: 0 }}>
            <Row
              key={1}
              gutter={0}
              style={{
                padding: 20,
                borderBottom: boxShadows.border,
                alignItems: 'center',
              }}>
              <Col span={12}>
                <p
                  style={{
                    ...typography.h4,
                    color: colors.pinkDark,
                    width: '80%',
                    margin: 0,
                    letterSpacing: '1px',
                  }}>
                  Investments
                </p>
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}>
                <RangePicker size="large" onChange={handleDateFilter} />
              </Col>
            </Row>
            <Row key={1} gutter={0} className={classes.activitiesRow}>
              <Col span={15}>
                <p style={{ color: colors.black, width: '80%', margin: 0 }}>Investment ref</p>
              </Col>
              <Col span={3}>Amount</Col>
              <Col span={3}>Status</Col>
              <Col span={3}>Confirmed</Col>
            </Row>
            <div style={{ position: 'relative' }}>{renderTable()}</div>
            <Pagination onChange={handlePaginationChange} total={investments.size} />
          </Card>
        </Col>
        <Col span={7}>
          <div
            style={{
              height: 'calc(100vh - 64px)',
              position: 'sticky',
              backgroundColor: colors.white,
              top: 0,
            }}
            bodyStyle={{ padding: 15 }}>
            {!!searchInvestmentId ? (
              <InvestmentDetails investmentId={searchInvestmentId} {...props} />
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 0,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  fontSize: '1.3em',
                  height: '100%',
                  textAlign: 'center',
                  color: colors.pinkDark,
                }}>
                <p style={{ width: '80%', borderBottom: boxShadows.border, paddingBottom: 15 }}>
                  Click on a date in the calendar to see all the returns and investment for the day
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Content>
  );
};

const useStyles = makeStyles({
  activeRow: {
    backgroundColor: colors.pinkLight,
  },
  activitiesRow: {
    padding: 20,
    borderBottom: boxShadows.border,
    cursor: 'pointer',
    transition: '.3s all',
    '&:hover': { backgroundColor: colors.gray3 },
  },
});

export default Investments;

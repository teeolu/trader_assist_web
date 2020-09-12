import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DatePicker, Layout, Row, Col, Card, notification } from 'antd';

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
import { overviewOptions } from '../../constants/dateFilter';
import { makeStyles } from '@material-ui/styles';
import InvestmentDetails from './InvestmentsDetail';
import { sortBaseOnTime } from '../../utils/time';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const Investments = (props) => {
  let { location } = props;

  const urlParams = new URLSearchParams(location.search);
  const searchInvestmentId = urlParams.get('investmentId');
  console.log('investmentId investmentId ', searchInvestmentId, location);

  const [
    selectedOption,
    // setSelectedOption
  ] = useState(overviewOptions[0]);
  const [
    activeTab,
    // setActiveTab
  ] = useState(0);
  const classes = useStyles();

  // const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investments = useSelector(getInvestmentsState);

  useEffect(() => {
    fetchInvestments();
    // eslint-disable-next-line
  }, [selectedOption.option]);

  useEffect(() => {
    if (status === Status.GET_INVESTMENTS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  function getParamArgs() {
    let queryParams;
    switch (activeTab) {
      case 0:
        queryParams = {};
        break;
      case 1:
        queryParams = { isConfirmed: false };
        break;
      case 2:
        queryParams = { isConfirmed: true };
        break;
      default:
        break;
    }
    return queryParams;
  }

  function fetchInvestments() {
    Api.InvestmentRepository.getInvesments({
      selectedOption,
      params: { ...getParamArgs() },
    });
  }

  function renderTable() {
    const dataSource = !!investments.investments[selectedOption.option]
      ? sortBaseOnTime(investments.investments[selectedOption.option].data)
      : [];
    return dataSource.map((investment, i) => {
      const investmentId = investment.investmentId;
      const color = investment.isConfirmed ? colors.blue : colors.red;
      const tag = investment.isConfirmed ? investment.confirmedBy.fullName : 'unconfirmed';
      const isActiveColor = investment.isActive ? colors.green : colors.red;
      const isActiveTag = investment.isActive ? 'Active' : 'Inactive';

      return (
        <Link to={`${location.pathname}?investmentId=${investmentId}`}>
          <Row key={1} gutter={0} className={classes.activitiesRow}>
            <Col span={15}>
              <p style={{ color: colors.black, width: '80%', margin: 0, letterSpacing: '1px' }}>
                {investment.investmentRef}
              </p>
            </Col>
            <Col span={3}>
              <p style={{ margin: 0, color: colors.black2 }}>
                &#8358;{investment.investmentAmount.toLocaleString()}
              </p>
            </Col>
            <Col span={3}>
              <Row>
                <span
                  style={{
                    ...typography.captionMedium,
                    border: `1px solid ${isActiveColor}`,
                    borderRadius: 5,
                    padding: '3px 5px',
                    color,
                    display: 'inline-block',
                  }}>
                  {isActiveTag}
                </span>
              </Row>
            </Col>
            <Col span={3}>
              <Row>
                <span
                  style={
                    !investment.isConfirmed
                      ? {
                          ...typography.captionMedium,
                          border: `1px solid ${color}`,
                          borderRadius: 5,
                          padding: '3px 5px',
                          color,
                          display: 'inline-block',
                        }
                      : null
                  }>
                  {tag}
                </span>
              </Row>
            </Col>
          </Row>
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
                <RangePicker size="large" />
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
            {renderTable()}
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
              <InvestmentDetails
                investmentId={searchInvestmentId}
                selectedOption={selectedOption}
                {...props}
              />
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

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Link, Route } from 'react-router-dom';
import { Layout, Row, Col, Card, notification, DatePicker } from 'antd';

import {
  getIsFetchingState,
  getReturnsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/returns/getReturnsReducer';
import { colors, typography, boxShadows } from '../../Css';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { overviewOptions } from '../../constants/dateFilter';
import { humanReadableTime, sortBaseOnTime } from '../../utils/time';
import PrivateRoute from '../../routes/PrivateRoute';
import ReportDetails from './ReturnsDetail';
import { makeStyles } from '@material-ui/styles';
import { Date } from 'core-js';
import { activites } from '../Activities/mock';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const Returns = (props) => {
  let {
    match: { path },
    location: { pathname },
  } = props;
  const returnIdFromParam = pathname.split(`${path}/`)[1];

  const [selectedOption, setSelectedOption] = useState(overviewOptions[0]);
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const returns = useSelector(getReturnsState);

  useEffect(() => {
    fetchReturns();
    // eslint-disable-next-line
  }, [selectedOption.option, activeTab]);

  useEffect(() => {
    if (status === Status.GET_INVESTORS_REQUEST_FAILURE) {
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
        queryParams = { isReturnDue: true, isApproved: false };
        break;
      case 2:
        queryParams = { isConfirmed: false, isApproved: true };
        break;
      case 3:
        queryParams = { isConfirmed: true };
        break;
      default:
        break;
    }
    return queryParams;
  }

  function fetchReturns() {
    Api.ReturnsRepository.getReturns({
      selectedOption,
      params: { ...getParamArgs() },
    });
  }

  function renderTable() {
    const dataSource = !!returns.returns[selectedOption.option]
      ? sortBaseOnTime(returns.returns[selectedOption.option].data)
      : [];

    return activites.map((el, i) => {
      const returnId = 1; // el._id;
      const color = el.isReturnDue
        ? el.isApproved
          ? el.isConfirmed
            ? colors.green
            : colors.blue
          : colors.red
        : colors.black2;
      const tag = el.isReturnDue
        ? el.isApproved
          ? el.isConfirmed
            ? 'confirmed'
            : 'unconfirmed'
          : 'unapproved'
        : 'not due';

      return (
        <Link to={`${path}/${returnId}`}>
          <Row key={1} gutter={0} className={classes.activitiesRow}>
            <Col span={15}>
              <p style={{ color: colors.black, width: '80%', margin: 0, letterSpacing: '1px' }}>
                ACU/RETURN/5667
              </p>
            </Col>
            <Col span={3}>
              <p style={{ margin: 0, color: colors.black2 }}>&#8358;{'12999'.toLocaleString()}</p>
            </Col>
            <Col span={3}>
              <Row>
                <span
                  style={{
                    ...typography.captionMedium,
                    border: `1px solid ${color}`,
                    borderRadius: 5,
                    padding: '3px 5px',
                    color,
                    display: 'inline-block',
                  }}>
                  {tag}
                </span>
              </Row>
            </Col>
            <Col span={3}>{humanReadableTime(new Date())}</Col>
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
                  Returns
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
                <p style={{ color: colors.black, width: '80%', margin: 0 }}>Return ref</p>
              </Col>
              <Col span={3}>Amount</Col>
              <Col span={3}>Status</Col>
              <Col span={3}>Due date</Col>
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
            <Switch>
              <PrivateRoute
                path={`${path}/:returnId`}
                exact={true}
                component={(props) => <ReportDetails selectedOption={selectedOption} {...props} />}
              />
              <Route
                render={() => (
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
                      Click on a date in the calendar to see all the returns and investment for the
                      day
                    </p>
                  </div>
                )}
              />
            </Switch>
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

export default Returns;

// return (
//   <Table
//     loading={isFetching}
//     columns={columns}
//     rowClassName={(returns) => {
//       if (!!returnIdFromParam) {
//         if (returns._id === returnIdFromParam) return classes.activeRow;
//       }
//     }}
// dataSource={
//   !!returns.returns[selectedOption.option]
//     ? sortBaseOnTime(returns.returns[selectedOption.option].data)
//     : []
// }
//     onRow={(record) => {
//       return {
//         onClick: (event) => {
//           history.push(`${path}/${record._id}`);
//         },
//       };
//     }}
//     pagination={{ pageSize: 10 }}
//   />

// const columns = [
//   {
//     title: 'Investor',
//     dataIndex: 'investor',
//     ellipsis: true,
//     render: (investor) => {
//       return <p style={{ marginBottom: 0 }}>{investor.fullName}</p>;
//     },
//     width: 150,
//   },
//   {
//     title: 'Amount',
//     dataIndex: 'amount',
//     render: (amount) => <span>&#8358;{amount.toLocaleString()}</span>,
//   },
//   {
//     title: 'Status',
//     dataIndex: 'dueDate',
//     render: (text, { isReturnDue, isApproved, isConfirmed }) => {
//       const color = isReturnDue
//         ? isApproved
//           ? isConfirmed
//             ? colors.green
//             : colors.blue
//           : colors.red
//         : colors.black2;
//       const tag = isReturnDue
//         ? isApproved
//           ? isConfirmed
//             ? 'confirmed'
//             : 'unconfirmed'
//           : 'unapproved'
//         : 'not due';
//       return (
//         <Row>
//           <span
//             style={{
//               ...typography.captionMedium,
//               border: `1px solid ${color}`,
//               borderRadius: 5,
//               padding: '3px 5px',
//               color,
//               display: 'inline-block',
//             }}>
//             {tag}
//           </span>
//         </Row>
//       );
//     },
//   },
//   {
//     title: 'Due date',
//     dataIndex: 'dueDate',
//     render: (date) => {
//       return humanReadableTime(date);
//     },
//   },
// ];

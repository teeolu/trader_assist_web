import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Link } from 'react-router-dom';
import { DatePicker, Layout, Row, Col, Card, notification, Select } from 'antd';

import {
  getIsFetchingState,
  getInvestmentsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investment/getInvestmentsReducer';
import { colors, typography, boxShadows } from '../../Css';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { overviewOptions } from '../../constants/dateFilter';
import { humanReadableTime, sortBaseOnTime } from '../../utils/time';
import history from '../../routes/history';
import PrivateRoute from '../../routes/PrivateRoute';
import { makeStyles } from '@material-ui/styles';
import InvestmentDetails from './InvestmentsDetail';
import { activites } from '../Activities/mock';

const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Investments = (props) => {
  let {
    match: { path },
    location: { pathname },
  } = props;

  const [selectedOption, setSelectedOption] = useState(overviewOptions[0]);
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investments = useSelector(getInvestmentsState);

  useEffect(() => {
    fetchInvestments();
    // eslint-disable-next-line
  }, [selectedOption.option, activeTab]);

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
    return activites.map((el, i) => {
      const investmentId = 1; // investment._id;
      const color = el.isConfirmed ? colors.blue : colors.red;
      const tag = el.isConfirmed ? el.confirmedBy.fullName : 'unconfirmed';
      const isActiveColor = el.isActive ? colors.green : colors.red;
      const isActiveTag = el.isActive ? 'Active' : 'Inactive';

      return (
        <Link to={`${path}/${investmentId}`}>
          <Row key={1} gutter={0} className={classes.activitiesRow}>
            <Col span={15}>
              <p style={{ color: colors.black, width: '80%', margin: 0, letterSpacing: '1px' }}>
                ACU/INVEST/5667
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
                    !el.isConfirmed
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

  function handleChange(value) {
    let option = overviewOptions.find((el) => el.option === value);
    setSelectedOption(option);
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
          <Card
            style={{
              height: 'calc(100vh - 64px)',
              position: 'sticky',
              top: 20,
            }}
            bodyStyle={{ padding: 15 }}>
            <Switch>
              <PrivateRoute
                path={`${path}/:investmentId`}
                exact={true}
                component={(props) => (
                  <InvestmentDetails selectedOption={selectedOption} {...props} />
                )}
              />
            </Switch>
          </Card>
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

// <Table
//   loading={isFetching}
//   columns={columns}
//   rowClassName={(investment) => {
//     if (!!investmentIdFromParam) {
//       if (investment._id === investmentIdFromParam) return classes.activeRow;
//     }
//   }}
//   dataSource={
//     !!investments.investments[selectedOption.option]
//       ? sortBaseOnTime(investments.investments[selectedOption.option].data)
//       : []
//   }
//   onRow={(investment) => {
//     return {
//       onClick: (event) => {
//         history.push(`${path}/${investment._id}`);
//       },
//     };
//   }}
//   pagination={{ pageSize: 10 }}
// />

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
//     dataIndex: 'isActive',
//     render: (isActive) => {
//       const color = isActive ? colors.green : colors.red;
//       const tag = isActive ? 'Active' : 'Inactive';
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
//     title: 'Confirmed',
//     dataIndex: 'isConfirmed',
//     render: (isConfirmed, { confirmedBy }) => {
//       const color = isConfirmed ? colors.blue : colors.red;
//       const tag = isConfirmed ? confirmedBy.fullName : 'unconfirmed';
//       return (
//         <Row>
//           <span
//             style={
//               !isConfirmed
//                 ? {
//                     ...typography.captionMedium,
//                     border: `1px solid ${color}`,
//                     borderRadius: 5,
//                     padding: '3px 5px',
//                     color,
//                     display: 'inline-block',
//                   }
//                 : null
//             }>
//             {tag}
//           </span>
//         </Row>
//       );
//     },
//   },
//   {
//     title: 'Start date',
//     dataIndex: 'startDate',
//     render: (date, record) => {
//       /** You should ensure you add startDate to the schema */
//       return humanReadableTime(record.startDate ? record.startDate : record.createdAt);
//     },
//   },
// ];

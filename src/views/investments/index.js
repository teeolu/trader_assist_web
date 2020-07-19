import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Table, Tabs, Layout, Button, Row, Col, Card, notification, Select } from 'antd';

import {
  getIsFetchingState,
  getInvestmentsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investment/getInvestmentsReducer';
import { colors, typography } from '../../Css';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { overviewOptions } from '../../constants/dateFilter';
import { humanReadableTime, sortBaseOnTime } from '../../utils/time';
import history from '../../routes/history';
import PrivateRoute from '../../routes/PrivateRoute';
// import ReportDetails from './ReturnsDetail';
import { makeStyles } from '@material-ui/styles';
import InvestmentDetails from './InvestmentsDetail';

const { TabPane } = Tabs;
const { Content } = Layout;
const { Option } = Select;

const Investments = (props) => {
  let {
    match: { path },
    location: { pathname },
  } = props;
  const investmentIdFromParam = pathname.split(`${path}/`)[1];

  const [selectedOption, setSelectedOption] = useState(overviewOptions[0]);
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investments = useSelector(getInvestmentsState);

  useEffect(() => {
    fetchInvestments();
  }, [selectedOption.option, activeTab]);

  useEffect(() => {
    if (!investmentIdFromParam) {
      // if (!!investments.investments[selectedOption.option])
      //   history.push(
      //     `${path}/${sortBaseOnTime(investments.investments[selectedOption.option].data)[0]._id}`,
      //   );
    }
  }, [investmentIdFromParam, investments]);

  useEffect(() => {
    if (status === Status.GET_INVESTMENTS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
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
    }
    return queryParams;
  }

  function fetchInvestments() {
    Api.InvestmentRepository.getInvesments({
      selectedOption,
      params: { ...getParamArgs() },
    });
  }

  const columns = [
    {
      title: 'Investor',
      dataIndex: 'investor',
      ellipsis: true,
      render: (investor) => {
        return <p style={{ marginBottom: 0 }}>{investor.fullName}</p>;
      },
      width: 150,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (amount) => <span>&#8358;{amount.toLocaleString()}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: (isActive) => {
        const color = isActive ? colors.green : colors.red;
        const tag = isActive ? 'Active' : 'Inactive';
        return (
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
        );
      },
    },
    {
      title: 'Confirmed',
      dataIndex: 'isConfirmed',
      render: (isConfirmed, { confirmedBy }) => {
        const color = isConfirmed ? colors.green : colors.red;
        const tag = isConfirmed ? confirmedBy.fullName : 'unconfirmed';
        return (
          <Row>
            <span
              style={
                !isConfirmed
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
        );
      },
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      render: (date, record) => {
        /** You should ensure you add startDate to the schema */
        return humanReadableTime(record.startDate ? record.startDate : record.createdAt);
      },
    },
  ];

  function renderTable() {
    return (
      <Table
        loading={isFetching}
        columns={columns}
        rowClassName={(investment) => {
          if (!!investmentIdFromParam) {
            if (investment._id === investmentIdFromParam) return classes.activeRow;
          }
        }}
        dataSource={
          !!investments.investments[selectedOption.option]
            ? sortBaseOnTime(investments.investments[selectedOption.option].data)
            : []
        }
        onRow={(investment) => {
          return {
            onClick: (event) => {
              history.push(`${path}/${investment._id}`);
            },
          };
        }}
        pagination={{ pageSize: 10 }}
      />
    );
  }

  function handleChange(value) {
    let option = overviewOptions.find((el) => el.option === value);
    setSelectedOption(option);
  }

  const operations = (
    <Select defaultValue={overviewOptions[0].option} style={{ width: 120 }} onChange={handleChange}>
      {overviewOptions.map((el) => (
        <Option key={el.option} value={el.option}>
          {el.option}
        </Option>
      ))}
    </Select>
  );

  return (
    <Content>
      <Row gutter={0}>
        <Col span={17}>
          <Card style={{ minHeight: 'calc(100vh - 64px)' }} bodyStyle={{ padding: 0 }}>
            <Tabs
              tabBarExtraContent={operations}
              animated={false}
              onChange={(activeKey) => setActiveTab(activeKey)}>
              <TabPane tab="All" key="0">
                {renderTable()}
              </TabPane>
              <TabPane tab="Unconfirmed" key="1">
                {renderTable()}
              </TabPane>
              <TabPane tab="Confirmed" key="2">
                {renderTable()}
              </TabPane>
            </Tabs>
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
});

export default Investments;

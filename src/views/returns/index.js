import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Table, Tabs, Layout, Button, Row, Col, Card, notification, Select } from 'antd';

import {
  getIsFetchingState,
  getReturnsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/returns/getReturnsReducer';
import { boxShadows, colors, typography } from '../../Css';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { overviewOptions } from '../../constants/dateFilter';
import { humanReadableTime, sortBaseOnTime } from '../../utils/time';
import history from '../../routes/history';
import PrivateRoute from '../../routes/PrivateRoute';
import ReportDetails from './ReturnsDetail';
import { makeStyles } from '@material-ui/styles';

const { TabPane } = Tabs;
const { Content } = Layout;
const { Option } = Select;

const Returns = (props) => {
  let {
    match: { path },
    location: { pathname },
  } = props;
  const returnIdFromParam = pathname.split(`${path}/`)[1];

  console.log('returnIdFromParam returnIdFromParam returnIdFromParam ', returnIdFromParam, path);
  const [selectedOption, setSelectedOption] = useState(overviewOptions[0]);
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const returns = useSelector(getReturnsState);

  useEffect(() => {
    fetchReturns();
  }, [selectedOption.option, activeTab]);

  useEffect(() => {
    if (!returnIdFromParam) {
      // if (!!returns.returns[selectedOption.option])
      // history.push(
      //   `${path}/${sortBaseOnTime(returns.returns[selectedOption.option].data)[0]._id}`,
      // );
    }
  }, [returnIdFromParam, returns]);

  useEffect(() => {
    if (status === Status.GET_INVESTORS_REQUEST_FAILURE) {
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
        queryParams = { isReturnDue: true, isApproved: false };
        break;
      case 2:
        queryParams = { isConfirmed: false, isApproved: true };
        break;
      case 3:
        queryParams = { isConfirmed: true };
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
      dataIndex: 'dueDate',
      render: (text, { isReturnDue, isApproved, isConfirmed }) => {
        const color = isReturnDue
          ? isApproved
            ? isConfirmed
              ? colors.green
              : colors.yellow
            : colors.red
          : colors.black2;
        const tag = isReturnDue
          ? isApproved
            ? isConfirmed
              ? 'confirmed'
              : 'unconfirmed'
            : 'unapproved'
          : 'not due';
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
      title: 'Due date',
      dataIndex: 'dueDate',
      render: (date) => {
        return humanReadableTime(date);
      },
    },
  ];

  function renderTable() {
    return (
      <Table
        loading={isFetching}
        columns={columns}
        rowClassName={(returns) => {
          if (!!returnIdFromParam) {
            if (returns._id === returnIdFromParam) return classes.activeRow;
          }
        }}
        dataSource={
          !!returns.returns[selectedOption.option]
            ? sortBaseOnTime(returns.returns[selectedOption.option].data)
            : []
        }
        onRow={(record) => {
          return {
            onClick: (event) => {
              history.push(`${path}/${record._id}`);
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
              <TabPane tab="Undue" key="1">
                {renderTable()}
              </TabPane>
              <TabPane tab="Unapproved" key="2">
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
              <PrivateRoute path={`${path}/:returnId`} exact={true} component={ReportDetails} />
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

export default Returns;

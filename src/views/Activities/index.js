import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UploadOutlined, DownloadOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Row, Card, notification, Col, Select, DatePicker } from 'antd';

import {
  getIsFetchingState,
  getInvestmentsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investment/getInvestmentsReducer';
import { colors, typography, fontsize, boxShadows } from '../../Css';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { overviewOptions } from '../../constants/dateFilter';
import { humanReadableTime } from '../../utils/time';
import { makeStyles } from '@material-ui/styles';
import { activites } from './mock';

const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ActivityIcons = {
  investor: UserOutlined,
  investment: DownloadOutlined,
  return: UploadOutlined,
};

const ActivityColors = {
  investor: '#f8b703',
  investment: '#0fa2a9',
  return: '#949217',
};

const Activities = (props) => {
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

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function renderActivitiesRows() {
    return activites.map((el, i) => {
      const Icon = ActivityIcons[el.type];
      return (
        <Link to="/">
          <Row key={1} gutter={0} className={classes.activitiesRow}>
            <Col span={2}>
              <div
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: ActivityColors[el.type],
                }}>
                <Icon className={classes.userProfileIcon} />
              </div>
            </Col>
            <Col span={16}>
              <p
                style={{
                  ...typography.captionMedium,
                  color: colors.black2,
                  marginBottom: 0,
                }}>
                {humanReadableTime(el.time)}
              </p>
              <p style={{ color: colors.black, width: '80%', margin: 0 }}>{el.description}</p>
            </Col>
            {/* <Col span={2}>MG</Col>
            <Col span={2}>MG</Col>
            <Col span={2}>MG</Col> */}
          </Row>
        </Link>
      );
    });
  }

  return (
    <Content>
      <Card style={{ minHeight: 'calc(100vh - 64px)' }} bodyStyle={{ padding: 0 }}>
        <Row
          key={1}
          gutter={0}
          style={{
            padding: 20,
            borderBottom: boxShadows.border,
          }}>
          <Col span={12}>
            <Select size="large" defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
              <Option value="jack">All</Option>
              <Option value="lucy">Investors</Option>
              <Option value="Yiminghe">Investment</Option>
              <Option value="Yiminghe">Returns</Option>
            </Select>
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
        {renderActivitiesRows()}
      </Card>
    </Content>
  );
};

const useStyles = makeStyles({
  activeRow: {
    backgroundColor: colors.pinkLight,
  },
  userProfileIcon: {
    padding: 10,
    borderRadius: '50%',
    fontSize: fontsize.h4,
    color: colors.gray3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activitiesRow: {
    padding: 20,
    borderBottom: boxShadows.border,
    cursor: 'pointer',
    transition: '.3s all',
    '&:hover': { backgroundColor: colors.gray3 },
  },
});

export default Activities;

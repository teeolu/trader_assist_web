import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Layout, Row, Card, notification, Col, Select, DatePicker } from 'antd';

import {
  getIsFetchingState,
  getBusinessHistoryState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/business/businessHistoryReducer';
import { colors, typography, fontsize, boxShadows } from '../../Css';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { dateFormat } from '../../constants/dateFilter';
import { humanReadableTime } from '../../utils/time';
import { historyTag } from '../../constants/historyConst';
import Pagination from '../../atoms/Pagination';
import Loading from '../../atoms/Loading';
const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Activities = (props) => {
  const classes = useStyles();
  const [queryParams, setQueryParams] = useState({
    dateFrom: null,
    dateTo: null,
    page: 1,
    limit: 10,
  });

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const platformHistory = useSelector(getBusinessHistoryState);

  useEffect(() => {
    fetchPlatformHistory();
    // eslint-disable-next-line
  }, [queryParams]);

  function handlePaginationChange(pageNumber) {
    setQueryParams((prevState) => ({
      ...prevState,
      page: pageNumber,
    }));
  }

  useEffect(() => {
    if (status === Status.GET_INVESTMENTS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  function fetchPlatformHistory() {
    Api.BusinessRepository.getBusinessHistory({
      params: queryParams,
    });
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function handleDateFilter(_, dateString) {
    setQueryParams((prevState) => ({
      ...prevState,
      dateFrom: dateString[0],
      dateTo: dateString[1],
    }));
  }

  function renderActivitiesRows() {
    return platformHistory.history.map((el, i) => {
      const Icon = !!historyTag[el.tag] ? historyTag[el.tag].icon : null;
      const color = !!historyTag[el.tag] ? historyTag[el.tag].color : null;

      return (
        <Link to="/">
          <Row key={1} gutter={0} className={classes.activitiesRow}>
            <Col span={2}>
              <div className={classes.historyIcon}>
                {!!Icon && <Icon className={classes.userProfileIcon} style={{ color }} />}
              </div>
            </Col>
            <Col span={16}>
              <p
                style={{
                  ...typography.captionMedium,
                  color: colors.black2,
                  marginBottom: 0,
                }}>
                {humanReadableTime(el.createdAt)}
              </p>
              <p style={{ color: colors.black, width: '80%', margin: 0 }}>{el.desc}</p>
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
            <Select
              size="large"
              defaultValue="All"
              clearIcon
              style={{ width: 120 }}
              onChange={handleChange}>
              {Object.keys(historyTag).map((tag) => (
                <Option style={{ textTransform: 'capitalize' }} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          </Col>
          <Col
            span={12}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <RangePicker size="large" format={dateFormat} onChange={handleDateFilter} />
          </Col>
        </Row>
        <div style={{ position: 'relative' }}>
          {renderActivitiesRows()}
          <div className={classes.loadingDiv}>{isFetching && <Loading marginTop={20} />}</div>
        </div>
        <Pagination onChange={handlePaginationChange} total={platformHistory.total} />
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
  historyIcon: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray3,
  },
  loadingDiv: { position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' },
});

export default Activities;

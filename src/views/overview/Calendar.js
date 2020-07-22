import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Calendar, Badge, Drawer, notification } from 'antd';

import {
  getIsFetchingState,
  getReturnsCalendarOverviewState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/returns/getReturnsCalendarOverviewReducer';
import { colors } from '../../Css';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';

const OverviewCalendar = ({ showDateDetails }) => {
  const [calendarDate, setCalendarDate] = useState({
    month: moment().month(),
    year: moment().year(),
  });

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const returnsCalendarOverview = useSelector(getReturnsCalendarOverviewState);

  useEffect(() => {
    if (status === Status.GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  useEffect(() => {
    Api.ReturnsRepository.getReturnsCalendarOverviewId({
      params: {
        ...calendarDate,
        month: calendarDate.month + 1,
      },
    });
  }, [calendarDate]);

  function getListData(value) {
    return !!returnsCalendarOverview.summary
      ? returnsCalendarOverview.summary[value.format('DD-MM-YY')]
      : {};
  }

  function dateCellRender(value) {
    const listData = !!returnsCalendarOverview.summary
      ? returnsCalendarOverview.summary[value.format('DD-MM-YYYY')]
      : {};
    return (
      <ul className="events" style={{ color: colors.gray }}>
        {!!Object.keys(listData || {}).length > 0 && (
          <>
            {listData.returns !== 0 && (
              <li style={{ fontSize: '1.2em', fontWeight: 'bold', color: colors.gray3 }}>
                <Badge status="processing" text={listData.returns} />
                <Badge
                  status="success"
                  text={<span>&#8358;{listData.amount.toLocaleString()}</span>}
                />
              </li>
            )}
          </>
        )}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function onSelectDate(date) {
    // setDateToShowDetail(date);
    showDateDetails(date);
  }

  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <p>
            {!!returnsCalendarOverview.totalReturns
              ? returnsCalendarOverview.totalReturns.toLocaleString()
              : 0}{' '}
            Investors
          </p>
          <div style={{ height: 3, width: '100%', backgroundColor: colors.blue }}></div>
        </div>
        <div style={{ flex: 1 }}>
          <p>
            &#8358;
            {!!returnsCalendarOverview.totalAmount
              ? returnsCalendarOverview.totalAmount.toLocaleString()
              : 0}{' '}
            Returns
          </p>
          <div style={{ height: 3, width: '100%', backgroundColor: colors.green }}></div>
        </div>
      </div>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onPanelChange={(date, mode) => {
          setCalendarDate({
            month: date.month(),
            year: date.year(),
          });
        }}
        onSelect={(date) => onSelectDate(date)}
      />
    </>
  );
};

export default OverviewCalendar;

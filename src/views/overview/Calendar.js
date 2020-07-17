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

const OverviewCalendar = ({ showDateDetails }) => {
  const [calendarDate, setCalendarDate] = useState({
    month: moment().month(),
    year: moment().year(),
  });

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const returnsCalendarOverview = useSelector(getReturnsCalendarOverviewState);
  // console.log(
  //   'GET_RETURNS_CALENDAR_OVERVIEW_REQUEST returnsCalendarOverview ',
  //   returnsCalendarOverview,
  // );

  useEffect(() => {
    Api.ReturnsRepository.getReturnsCalendarOverviewId({
      params: {
        ...calendarDate,
      },
    });
  }, [calendarDate]);

  function getListData(value) {
    return [
      // { type: 'error', content: <span>&#8358;1,200,000</span> },
      // { type: 'success', content: <span>&#8358;300,000'</span> },
      // { type: 'warning', content: '3' },
    ];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events" style={{ color: colors.gray }}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    // const num = getMonthData(value);
    // return num ? (
    //   <div className="notes-month">
    //     <section>{num}</section>
    //     <span>Backlog number</span>
    //   </div>
    // ) : null;
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
          <p>&#8358;1,230,000 Returns</p>
          <div style={{ height: 3, width: '100%', backgroundColor: colors.red }}></div>
        </div>
        <div style={{ flex: 1 }}>
          <p>123 Investors</p>
          <div style={{ height: 3, width: '100%', backgroundColor: colors.blue }}></div>
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

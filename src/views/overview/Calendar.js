import React, { useState } from 'react';
import { Calendar, Badge, Drawer } from 'antd';
import CalendarDateDetails from './CalendarDateDetails';
import { colors } from '../../Css';

const OverviewCalendar = () => {
  const [dateToShowDetails, setDateToShowDetail] = useState(null);

  function getListData(value) {
    return [
      { type: 'error', content: <span>&#8358;1,200,000</span> },
      { type: 'success', content: <span>&#8358;300,000'</span> },
      { type: 'warning', content: '3' },
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
    setDateToShowDetail(date);
  }

  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <p>Returns</p>
          <div style={{ height: 3, width: '100%', backgroundColor: colors.red }}></div>
          <p>&#8358;1,230,000</p>
        </div>
        <div style={{ flex: 1 }}>
          <p>Investments</p>
          <div style={{ height: 3, width: '100%', backgroundColor: colors.green }}></div>
          <p>&#8358;1,230,000</p>
        </div>
        <div style={{ flex: 1 }}>
          <p>Investors</p>
          <div style={{ height: 3, width: '100%', backgroundColor: colors.blue }}></div>
          <p>123</p>
        </div>
      </div>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={(date) => onSelectDate(date)}
      />
      <CalendarDateDetails
        dateToShowDetails={dateToShowDetails}
        onClose={() => setDateToShowDetail(null)}
      />
    </>
  );
};

export default OverviewCalendar;

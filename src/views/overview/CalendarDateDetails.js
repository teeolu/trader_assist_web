import React, { useState } from 'react';
import { Drawer } from 'antd';

const CalendarDateDetails = ({ onClose, dateToShowDetails }) => {
  return (
    <Drawer
      title={!!dateToShowDetails && dateToShowDetails.format('dddd Do MMMM, YYYY')}
      placement="right"
      closable={false}
      onClose={onClose}
      destroyOnClose={true}
      maskStyle={{ backgroundColor: 'transparent' }}
      width={400}
      keyboard={true}
      visible={Boolean(dateToShowDetails)}></Drawer>
  );
};

export default CalendarDateDetails;

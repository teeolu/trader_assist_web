import React, { useEffect } from 'react';
import { Drawer, notification, List } from 'antd';

import { dateFormat } from '../../constants/dateFilter';
import { sortBaseOnTime } from '../../utils/time';
import { colors } from '../../Css';
import { makeStyles } from '@material-ui/styles';
import CalendarDateReturns from './CalendarDateReturn';
import CalendarDateInvestments from './CalendarDateInvestment';

const CalendarDateDetails = ({ onClose, dateToShowDetails }) => {
  const classes = useStyles();

  const selectedOption = {
    startDate: !!dateToShowDetails && dateToShowDetails.startOf('day').format(),
    endDate: !!dateToShowDetails && dateToShowDetails.endOf('day').format(),
    caption: '',
    option: !!dateToShowDetails && dateToShowDetails.format(dateFormat),
  };

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
      visible={Boolean(dateToShowDetails)}>
      <div>
        <CalendarDateReturns
          dateToShowDetails={dateToShowDetails}
          selectedOption={selectedOption}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <CalendarDateInvestments
          dateToShowDetails={dateToShowDetails}
          selectedOption={selectedOption}
        />
      </div>
    </Drawer>
  );
};

const useStyles = makeStyles({
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.pinkLight,
    },
  },
});

export default CalendarDateDetails;

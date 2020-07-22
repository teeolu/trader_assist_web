import React from 'react';
// import { makeStyles } from '@material-ui/styles';

import { dateFormat } from '../../constants/dateFilter';
import { typography } from '../../Css';
import CalendarDateReturns from './CalendarDateReturn';

const CalendarDateDetails = ({ dateToShowDetails }) => {
  // const classes = useStyles();

  const selectedOption = {
    startDate: !!dateToShowDetails && dateToShowDetails.startOf('day').format(),
    endDate: !!dateToShowDetails && dateToShowDetails.endOf('day').format(),
    caption: '',
    option: !!dateToShowDetails && dateToShowDetails.format(dateFormat),
  };

  return (
    <div style={{ padding: 10 }}>
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 0,
          justifyContent: 'space-between',
          ...typography.h4,
        }}>
        {!!dateToShowDetails && dateToShowDetails.format('ddd Do MMMM, YYYY')}{' '}
      </p>
      <CalendarDateReturns dateToShowDetails={dateToShowDetails} selectedOption={selectedOption} />
    </div>
  );
};

// const useStyles = makeStyles({
//   listItem: {
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: colors.pinkLight,
//     },
//   },
// });

export default CalendarDateDetails;

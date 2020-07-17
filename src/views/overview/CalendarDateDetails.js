import React from 'react';
import { Drawer, Button } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { CloseOutlined } from '@ant-design/icons';

import { dateFormat } from '../../constants/dateFilter';
import { colors, fontsize } from '../../Css';
import CalendarDateReturns from './CalendarDateReturn';

const CalendarDateDetails = ({ onClose, dateToShowDetails, width }) => {
  // const classes = useStyles();

  const selectedOption = {
    startDate: !!dateToShowDetails && dateToShowDetails.startOf('day').format(),
    endDate: !!dateToShowDetails && dateToShowDetails.endOf('day').format(),
    caption: '',
    option: !!dateToShowDetails && dateToShowDetails.format(dateFormat),
  };

  return (
    <Drawer
      style={{ position: 'absolute', padding: 0 }}
      bodyStyle={{ padding: 0 }}
      title={
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 0,
            justifyContent: 'space-between',
          }}>
          {!!dateToShowDetails && dateToShowDetails.format('ddd Do MMMM, YYYY')}{' '}
          <Button
            type="primary"
            shape="circle"
            onClick={onClose}
            style={{ border: 'none', backgroundColor: 'transparent' }}
            icon={
              <CloseOutlined style={{ color: colors.pinkDark, fontSize: fontsize.paragraph }} />
            }
          />
        </p>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      getContainer={false}
      destroyOnClose={true}
      maskStyle={{ backgroundColor: 'transparent' }}
      width={width || 300}
      keyboard={true}
      visible={Boolean(dateToShowDetails)}>
      <CalendarDateReturns dateToShowDetails={dateToShowDetails} selectedOption={selectedOption} />
    </Drawer>
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

import React, { useEffect } from 'react';
import { notification, List } from 'antd';
import { useSelector } from 'react-redux';

import {
  getIsFetchingState,
  getInvestmentsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investment/getInvestmentsReducer';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { humanReadableTime, sortBaseOnTime } from '../../utils/time';
import { colors, typography, boxShadows } from '../../Css';
import { makeStyles } from '@material-ui/styles';
import history from '../../routes/history';
import { PrivatePaths } from '../../routes';

const CalendarDateInvestments = ({ dateToShowDetails, selectedOption }) => {
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investments = useSelector(getInvestmentsState);

  const classes = useStyles();

  useEffect(() => {
    if (!!dateToShowDetails) fetchInvestments();
  }, [dateToShowDetails]);

  useEffect(() => {
    if (status === Status.GET_INVESTMENTS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  function fetchInvestments() {
    Api.InvestmentRepository.getInvesments({
      selectedOption,
    });
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: boxShadows.border,
        }}>
        <h4 style={{ ...typography.paragraph, fontWeight: 600 }}>Investments</h4>
      </div>
      <List
        itemLayout="horizontal"
        loading={isFetching}
        dataSource={
          !!investments.investments[selectedOption.option]
            ? sortBaseOnTime(investments.investments[selectedOption.option].data)
            : []
        }
        renderItem={(investment) => {
          const {
            _id,
            amount,
            isApproved,
            isConfirmed,
            approvedBy,
            confirmedBy,
            dueDate,
            isReturnDue,
            investor,
          } = investment;

          const color = isConfirmed ? colors.green : colors.red;
          const tag = isConfirmed ? 'confirmed' : 'unconfirmed';
          const caption = isConfirmed ? `Confirmed by ${confirmedBy}` : `Not yet confirmed`;
          return (
            <List.Item
              className={classes.listItem}
              onClick={() => history.push(`${PrivatePaths.INVESTMENTS}/${_id}`)}>
              <List.Item.Meta
                title={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <p style={{ ...typography.paragraph, fontWeight: 600, marginBottom: 0 }}>
                      &#8358;{amount.toLocaleString()}
                    </p>
                    <span
                      style={{
                        ...typography.captionMedium,
                        border: `1px solid ${color}`,
                        borderRadius: 5,
                        padding: '3px 5px',
                        fontWeight: 400,
                        color,
                        marginLeft: 10,
                        display: 'inline-block',
                      }}>
                      {tag}
                    </span>
                  </div>
                }
                description={investor.fullName}
              />
            </List.Item>
          );
        }}
      />
    </>
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

export default CalendarDateInvestments;

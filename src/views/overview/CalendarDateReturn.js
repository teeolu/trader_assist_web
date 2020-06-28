import React, { useEffect } from 'react';
import { notification, List } from 'antd';
import { useSelector } from 'react-redux';

import {
  getIsFetchingState,
  getReturnsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/returns/getReturnsReducer';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { humanReadableTime, sortBaseOnTime } from '../../utils/time';
import { colors, typography, boxShadows } from '../../Css';
import { makeStyles } from '@material-ui/styles';
import history from '../../routes/history';
import { PrivatePaths } from '../../routes';

const CalendarDateReturns = ({ dateToShowDetails, selectedOption }) => {
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const returns = useSelector(getReturnsState);

  const classes = useStyles();

  useEffect(() => {
    if (!!dateToShowDetails) fetchReturns();
  }, [dateToShowDetails]);

  useEffect(() => {
    if (status === Status.GET_RETURNS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  function fetchReturns() {
    Api.ReturnsRepository.getReturns({
      selectedOption,
    });
  }

  return (
    <>
      <List
        itemLayout="horizontal"
        loading={isFetching}
        dataSource={
          !!returns.returns[selectedOption.option]
            ? sortBaseOnTime(returns.returns[selectedOption.option].data)
            : []
        }
        renderItem={(returns) => {
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
          } = returns;
          const color = isReturnDue
            ? isApproved
              ? isConfirmed
                ? colors.green
                : colors.yellow
              : colors.red
            : colors.black2;
          const returnStatus = isReturnDue
            ? isApproved
              ? isConfirmed
                ? 'confirmed'
                : 'unconfirmed'
              : 'unapproved'
            : 'not due';
          const returnReview = isReturnDue
            ? isApproved
              ? isConfirmed
                ? `Confirmed by ${confirmedBy}`
                : `Approved by ${approvedBy}, confirm return`
              : 'Approve this return'
            : `Due date - ${humanReadableTime(dueDate)}`;
          return (
            <List.Item
              className={classes.listItem}
              onClick={() => history.push(`${PrivatePaths.RETURNS}/${_id}`)}>
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
                      {returnStatus}
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

export default CalendarDateReturns;

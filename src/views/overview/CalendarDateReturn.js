import React, { useEffect } from 'react';
import { notification, List } from 'antd';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import {
  getIsFetchingState,
  getReturnsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/returns/getReturnsReducer';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { Api } from '../../repository/Api';
import { sortBaseOnTime } from '../../utils/time';
import { colors, typography } from '../../Css';
import history from '../../routes/history';
import { PrivatePaths } from '../../routes';
import { getCurrentBusinessState } from '../../redux/business/addBusinessReducer';
import { dateFormat } from '../../constants/dateFilter';

const CalendarDateReturns = ({ dateToShowDetails }) => {
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const returns = useSelector(getReturnsState);
  const currentBusiness = useSelector(getCurrentBusinessState);

  const selectedOption = {
    startDate: !!dateToShowDetails && dateToShowDetails.startOf('day').format(),
    endDate: !!dateToShowDetails && dateToShowDetails.endOf('day').format(),
    caption: '',
    option: !!dateToShowDetails && dateToShowDetails.format(dateFormat),
  };

  const classes = useStyles();

  useEffect(() => {
    if (!!dateToShowDetails) fetchReturns();
    // eslint-disable-next-line
  }, [dateToShowDetails]);

  useEffect(() => {
    if (status === Status.GET_RETURNS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  function fetchReturns() {
    Api.ReturnsRepository.getReturns({
      selectedOption,
    });
  }

  const sum = !!returns.returns[selectedOption.option]
    ? returns.returns[selectedOption.option].data
        .map((item) => item.amount)
        .reduce((prev, curr) => prev + curr, 0)
    : null;

  return (
    <>
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
        <p>{sum}</p>
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
              // approvedBy,
              // confirmedBy,
              // dueDate,
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
            // const returnReview = isReturnDue
            //   ? isApproved
            //     ? isConfirmed
            //       ? `Confirmed by ${confirmedBy}`
            //       : `Approved by ${approvedBy}, confirm return`
            //     : 'Approve this return'
            //   : `Due date - ${humanReadableTime(dueDate)}`;
            return (
              <List.Item
                className={classes.listItem}
                onClick={() =>
                  history.push(`/${currentBusiness.businessName}${PrivatePaths.RETURNS}/${_id}`)
                }>
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
      </div>
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

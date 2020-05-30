import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  getIsFetchingState,
  getInvestmentsByIdState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investment/getInvestmentByIdReducer';
import { Api } from '../../repository/Api';
import { notification, Space, Spin } from 'antd';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { typography, colors } from '../../Css';
import { humanReadableTime } from '../../utils/time';
import history from '../../routes/history';
import { PrivatePaths } from '../../routes';
import bankImage from '../../assets/images/bank.png';

const InvestmentDetails = (props) => {
  let {
    match: {
      path,
      params: { investmentId },
    },
  } = props;
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investmentsById = useSelector(getInvestmentsByIdState);

  useEffect(() => {
    if (!!investmentId)
      Api.InvestmentRepository.getInvestmentById({
        params: { investmentId },
      });
  }, [investmentId]);
  const {
    amount,
    isReturnDue,
    isApproved,
    isConfirmed,
    confirmedBy,
    approvedBy,
    dueDate,
    investor,
    _id,
  } = investmentsById[investmentId] || {};

  console.log(
    'investmentsById[investmentId] investmentsById[investmentId] ',
    investmentsById[investmentId],
  );

  const color = isConfirmed ? colors.green : colors.red;
  const tag = isConfirmed ? 'confirmed' : 'unconfirmed';
  const caption = isConfirmed ? `Confirmed by ${confirmedBy}` : `Not yet confirmed`;

  useEffect(() => {
    if (status === Status.GET_RETURN_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  if (isFetching && !investmentsById[investmentId]) {
    return (
      <Space style={{ width: '100%', height: 300, justifyContent: 'center' }}>
        <Spin />
      </Space>
    );
  }

  return (
    <div>
      <img src={bankImage} alt="bank" style={{ height: 300, width: '100%' }} />
      <p style={{ ...typography.h4, color: colors.black2 }}>
        &#8358;{!!amount && amount.toLocaleString()}
      </p>
      <p
        onClick={() => history.push(`${PrivatePaths.INVESTORS}/${investor._id}`)}
        style={{ color: colors.blue, textDecoration: 'underline', cursor: 'pointer' }}>
        {!!investor && investor.fullName}
      </p>
      <p>{caption}</p>
      <p
        style={{
          ...typography.captionMedium,
          border: `1px solid ${color}`,
          borderRadius: 5,
          padding: '3px 5px',
          color,
          display: 'inline-block',
        }}>
        {tag}
      </p>
    </div>
  );
};

export default InvestmentDetails;

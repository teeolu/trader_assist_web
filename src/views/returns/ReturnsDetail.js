import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notification, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';

import {
  getIsFetchingState,
  getReturnsByIdState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/returns/getReturnByIdReducer';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { typography, colors } from '../../Css';
import { humanReadableTime } from '../../utils/time';
import { PrivatePaths } from '../../routes';
import ApproveReturnBtn from './ApproveReturnBtn';
import { getCurrentBusinessState } from '../../redux/business/addBusinessReducer';
import ConfirmReturn from './ConfirmReturn';

const ReportDetails = (props) => {
  let {
    match: {
      params: { returnId },
    },
  } = props;
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const returnsById = useSelector(getReturnsByIdState);
  const currentBusiness = useSelector(getCurrentBusinessState);

  useEffect(() => {
    if (!!returnId)
      Api.ReturnsRepository.getReturnById({
        params: { returnId },
      });
  }, [returnId]);
  const {
    amount,
    isReturnDue,
    isApproved,
    isConfirmed,
    confirmedBy,
    proofOfPayment,
    approvedBy,
    dueDate,
    investor,
    _id,
  } = returnsById[returnId] || {};

  const color = isReturnDue
    ? isApproved
      ? isConfirmed
        ? colors.green
        : colors.blue
      : colors.red
    : colors.black2;
  const tag = isReturnDue
    ? isApproved
      ? isConfirmed
        ? 'confirmed'
        : 'unconfirmed'
      : 'unapproved'
    : 'not due';
  const caption = isReturnDue
    ? isApproved
      ? isConfirmed
        ? `Confirmed by ${confirmedBy}`
        : `Approved by ${approvedBy.fullName}`
      : 'Approve this return'
    : `Due date - ${humanReadableTime(dueDate)}`;

  useEffect(() => {
    if (status === Status.GET_RETURN_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  if (isFetching && !returnsById[returnId]) {
    return (
      <Space style={{ width: '100%', height: 300, justifyContent: 'center' }}>
        <Spin />
      </Space>
    );
  }

  return (
    <div>
      {!!isReturnDue ? (
        !isApproved ? (
          <ApproveReturnBtn investmentReturn={returnsById[returnId]} />
        ) : !isConfirmed ? (
          <ConfirmReturn investmentReturn={returnsById[returnId]} />
        ) : (
          <img src={proofOfPayment.secure_url} alt="bank" style={{ height: 300, width: '100%' }} />
        )
      ) : null}
      <p style={{ ...typography.h4, color: colors.black2 }}>
        &#8358;{!!amount && amount.toLocaleString()}
      </p>
      <p>
        <Link
          to={`/${currentBusiness.businessName}${PrivatePaths.INVESTORS}/${
            !!investor && investor._id
          }`}>
          {!!investor && investor.fullName}
        </Link>
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

export default ReportDetails;

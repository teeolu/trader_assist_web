import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notification, Row, Col } from 'antd';

import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/returns/editReturnsReducer';
import { Api } from '../../repository/Api';
import { colors } from '../../Css';
import Buttons from '../../atoms/Buttons';
import { notificationConfigs } from '../../constants/ToastNotifincation';

const ApproveReturnBtn = (props) => {
  let { investmentReturn } = props;
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);

  useEffect(() => {
    if (status === Status.GET_INVESTORS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  const { _id } = investmentReturn;

  function approveReturn() {
    Api.ReturnsRepository.editReturns({
      formData: {
        data: {
          isApproved: true,
          returnId: _id,
        },
        tag: 'approve',
      },
    });
  }

  return (
    <Col span={24}>
      <Row span={12}>This return is due for payment, proceed to approve return</Row>
      <Row span={12}>
        <Buttons
          btnText="Approve return"
          size="small"
          textColor={colors.pinkDark}
          btnAction={approveReturn}
          isLoading={isFetching}
          style={{
            padding: '7px 10px',
            backgroundColor: 'transparent',
            border: `1px solid ${colors.pinkDark}`,
          }}
        />
      </Row>
    </Col>
  );
};

export default ApproveReturnBtn;

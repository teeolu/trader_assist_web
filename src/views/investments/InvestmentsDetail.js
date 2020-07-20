import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { notification, Space, Spin, Row, Col } from 'antd';

import {
  getIsFetchingState,
  getInvestmentsByIdState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investment/getInvestmentByIdReducer';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { typography, colors } from '../../Css';
import { PrivatePaths } from '../../routes';
import UploadImage from '../../atoms/UploadImage';
import Buttons from '../../atoms/Buttons';
import { getCurrentBusinessState } from '../../redux/business/addBusinessReducer';

const InvestmentDetails = ({ selectedOption, ...props }) => {
  let {
    match: {
      params: { investmentId },
    },
  } = props;
  const imageUploadKey = 'confirmInvestment';
  const [selectedImage, setSelectedImage] = useState(null);

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investmentsById = useSelector(getInvestmentsByIdState);
  const currentBusiness = useSelector(getCurrentBusinessState);

  useEffect(() => {
    if (!!investmentId)
      Api.InvestmentRepository.getInvestmentById({
        params: { investmentId },
      });
  }, [investmentId]);
  const { amount, isReturnDue, isConfirmed, confirmedBy, dueDate, investor, proofOfPayment, _id } =
    investmentsById[investmentId] || {};

  const color = isConfirmed ? colors.blue : colors.red;
  const tag = isConfirmed ? 'confirmed' : 'unconfirmed';
  const caption = isConfirmed ? `Confirmed by ${confirmedBy.fullName}` : `Not yet confirmed`;

  useEffect(() => {
    if (status === Status.GET_RETURN_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  function onSelectImage(img) {
    setSelectedImage(img);
  }

  function onUploadImage() {
    const data = new FormData();

    data.append('photo', selectedImage);
    Api.MiscRepository.uploadImage({
      imageUploadUri: null,
      formData: data,
    }).then((data) => {
      if (!!data) {
        Api.InvestmentRepository.editInvesments({
          formData: {
            data: {
              proofOfPayment: data,
              isConfirmed: true,
              _id,
            },
            tag: 'confirm',
          },
          selectedOption,
        });
        notification['open']({
          ...notificationConfigs,
          message: `Successfull! Investment has been verified`,
          key: imageUploadKey,
          duration: 5,
        });
      }
    });
  }

  if (isFetching && !investmentsById[investmentId]) {
    return (
      <Space style={{ width: '100%', height: 300, justifyContent: 'center' }}>
        <Spin />
      </Space>
    );
  }

  return (
    <div>
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
      {!isConfirmed ? (
        <Row justify="space-around" style={{ margin: 20 }}>
          <Col>
            <UploadImage
              onSelectImage={onSelectImage}
              imageUploadKey={imageUploadKey}
              uploadeText="Select image to proof payment"
            />
            <Buttons
              btnText="confirm payment"
              size="small"
              textColor={colors.pinkDark}
              btnAction={onUploadImage}
              // isLoading={isFetching}
              disabled={!selectedImage}
              style={{
                padding: '7px 10px',
                backgroundColor: 'transparent',
                border: `1px solid ${colors.pinkDark}`,
              }}
            />
          </Col>
        </Row>
      ) : (
        <img src={proofOfPayment.secure_url} alt="bank" style={{ height: 300, width: '100%' }} />
      )}
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
    </div>
  );
};

export default InvestmentDetails;

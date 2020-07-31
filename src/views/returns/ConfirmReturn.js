import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notification, Row, Col } from 'antd';

import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/returns/editReturnsReducer';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { colors } from '../../Css';
import UploadImage from '../../atoms/UploadImage';
import Buttons from '../../atoms/Buttons';

const ConfirmReturn = (props) => {
  let { selectedOption, investmentReturn } = props;
  const imageUploadKey = 'confirmReturn';
  const [selectedImage, setSelectedImage] = useState(null);
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);

  useEffect(() => {
    if (status === Status.GET_RETURN_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  const { _id } = investmentReturn;

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
        Api.ReturnsRepository.editReturns({
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

  return (
    <Row justify="space-around" style={{ margin: 20 }}>
      <Col>
        <UploadImage
          onSelectImage={onSelectImage}
          imageUploadKey={imageUploadKey}
          uploadeText="Select image to proof payment"
        />
        <Buttons
          btnText="Confirm return"
          size="small"
          textColor={colors.pinkDark}
          btnAction={onUploadImage}
          isLoading={isFetching}
          disabled={!selectedImage}
          style={{
            padding: '7px 10px',
            backgroundColor: 'transparent',
            border: `1px solid ${colors.pinkDark}`,
          }}
        />
      </Col>
    </Row>
  );
};

export default ConfirmReturn;

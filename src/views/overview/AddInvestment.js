import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, notification, Button } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';

import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/business/addBusinessReducer';
import Buttons from '../../atoms/Buttons';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { colors, typography, boxShadows, fontsize } from '../../Css';
import history from '../../routes/history';

const AddInvestment = ({ businessAsStaff }) => {
  const imageUploadKey = 'uploadBusinessImageKey';
  const isSelectoption = Array.isArray(businessAsStaff) && businessAsStaff.length > 0;
  const [selectedImage, setSelectedImage] = useState(null);
  const [form] = Form.useForm();
  const classes = useStyles({ isVisible: Array.isArray(businessAsStaff) });

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);

  useEffect(() => {
    if (status === Status.ADD_BUSINESS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  useEffect(() => {
    if (isFetching) {
      notification['open']({
        message: `Creating your platform...`,
        key: imageUploadKey,
        ...notificationConfigs,
      });
    }
  }, [isFetching]);

  function onFinish(values) {
    const data = new FormData();

    data.append('photo', selectedImage);
    Api.MiscRepository.uploadImage({
      imageUploadUri: null,
      formData: data,
    })
      .then((data) => {
        if (!!data) {
          notification['open']({
            message: `Registering your platform...`,
            key: imageUploadKey,
            icon: <LoadingOutlined style={{ color: colors.green }} />,
            ...notificationConfigs,
          });
          Api.BusinessRepository.addBusiness({
            formData: {
              ...values,
              businessImage: data,
            },
          });
        }
      })
      .then((success) => {
        notification['open']({
          ...notificationConfigs,
          message: `Your platform has been created successfully`,
          key: imageUploadKey,
          duration: 5,
        });
        history.replace('overview');
      });
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  function onSelectImage(img) {
    setSelectedImage(img);
  }

  return (
    <>
      <div
        className={classes.investorsHeading}
        style={{
          height: 50,
          width: '100%',
          borderBottom: boxShadows.border,
        }}>
        <Button
          type="primary"
          shape="circle"
          onClick={() => history.goBack()}
          style={{ backgroundColor: colors.pinkLight, border: 'none' }}
          icon={<ArrowLeftOutlined style={{ color: colors.pinkDark, fontSize: fontsize.h4 }} />}
        />
        <p className={classes.investorText}>
          <b>Add investment</b>
        </p>
      </div>
      <div style={{ width: '70%', padding: '20px 100px 50px 50px' }}>
        <Form
          form={form}
          name="register"
          layout="vertical"
          hideRequiredMark={true}
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
          scrollToFirstError>
          <Form.Item
            name="businessName"
            label="Platform name"
            rules={[{ required: true, message: 'Business name is required!' }]}>
            <Input
              autoFocus
              size="large"
              placeholder="A name that you can be recognised with officially"
            />
          </Form.Item>
          <Form.Item
            name="businessAddress"
            label="Address"
            rules={[
              { required: true, message: 'Password is required!' },
              // {
              //   type: 'email',
              //   message: 'Requires a valid email',
              // },
            ]}>
            <Input size="large" placeholder="Enter an address to access you" />
          </Form.Item>
          <Form.Item
            name="businessPhoneNumber"
            label="Platform phone number"
            rules={[{ required: true, message: 'Phone number is required!' }]}>
            <Input size="large" placeholder="e.g 090987654321" />
          </Form.Item>
          <Form.Item
            name="businessEmail"
            label="Platform email address"
            rules={[
              { required: true, message: 'Email is required!' },
              {
                type: 'email',
                message: 'Requires a valid email',
              },
            ]}>
            <Input size="large" placeholder="e.g myemail@emailprovider.com" />
          </Form.Item>
          <Buttons
            btnText="Add investor"
            size="small"
            textColor={colors.pinkDark}
            textStyle={{}}
            style={{
              padding: '7px 10px',
              backgroundColor: 'transparent',
              border: `1px solid ${colors.pinkDark}`,
            }}
          />
        </Form>
      </div>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    top: (props) => (props.isVisible ? 0 : 1000),
    bottom: 0,
    right: 0,
    transition: '.5s all',
  },
  investorsHeading: {
    padding: 15,
    width: '100%',
    height: 50,
    borderBottom: boxShadows.border,
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center',
  },
  investorText: {
    ...typography.paragraph,
    marginBottom: 0,
    // fontWeight: 600,
    paddingLeft: 15,
    color: colors.black2,
    letterSpacing: '1px',
  },
});

export default AddInvestment;

import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, notification } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../redux/business/addBusinessReducer';
import OnboardingLayout from '../components/OnboardingLayout';
import Buttons from '../atoms/Buttons';
import { Api } from '../repository/Api';
import { notificationConfigs } from '../constants/ToastNotifincation';
import { makeStyles } from '@material-ui/styles';
import { colors, typography } from '../Css';
import UploadImage from '../atoms/UploadImage';
import history from '../routes/history';

const AddBusiness = ({ businessAsStaff }) => {
  const imageUploadKey = 'uploadBusinessImageKey';
  const isSelectoption = Array.isArray(businessAsStaff) && businessAsStaff.length > 0;
  const [isAddBusinessVisible, setIsAddBusinessVisible] = useState(!isSelectoption);
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
    }).then((data) => {
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
        }).then((success) => {
          console.log('addBusiness addBusiness addBusiness ', success);
          if (success === true) {
            notification['open']({
              ...notificationConfigs,
              message: `Your platform has been created successfully`,
              key: imageUploadKey,
              duration: 5,
            });
            history.replace('investors');
          }
        });
      }
    });
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  function onSelectImage(img) {
    setSelectedImage(img);
  }

  if (!Array.isArray(businessAsStaff)) return null;

  return (
    <div className={classes.container}>
      <OnboardingLayout
        actionTxt="sign in"
        id="addBusiness"
        hideNavigation
        makePlain
        onSubmit={onFinish}>
        {isSelectoption ? (
          <div>
            <p>Continue as</p>
            {businessAsStaff.map((el) => (
              <Buttons
                key={el._id}
                btnText={`${el.role} at ${el.business.businessName}`}
                textColor={colors.pinkDark}
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.pinkDark}`,
                  borderRadius: 50,
                  padding: '.8rem 2rem',
                  marginBottom: '1.5rem',
                }}
              />
            ))}
            <p>Or</p>
            <Buttons
              style={{
                border: `1px solid ${colors.pinkDark}`,
                borderRadius: 50,
                padding: '.8rem 2rem',
              }}
              btnText="Add new business"
              type="primary"
              htmlType="submit"
            />
          </div>
        ) : null}
        {isAddBusinessVisible && (
          <div>
            <Row
              gutter={24}
              align="middle"
              justify="center"
              style={{ marginBottom: '2rem', alignItems: 'center', justifyContent: 'center' }}>
              <Col span={16}>
                <h3 style={{ ...typography.h3, color: colors.pinkDark }}>Add your platform</h3>

                <p style={{ ...typography.paragraph }}>
                  How will you like to be seen and contacted
                </p>
              </Col>
              <Col span={8}>
                <UploadImage imageUploadKey={imageUploadKey} onSelectImage={onSelectImage} />
              </Col>
            </Row>

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
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="businessPhoneNumber"
                    label="Platform phone number"
                    rules={[{ required: true, message: 'Phone number is required!' }]}>
                    <Input size="large" placeholder="e.g 090987654321" />
                  </Form.Item>
                </Col>
                <Col span={12}>
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
                </Col>
              </Row>
              <Buttons
                btnText="Add your platform"
                isLoading={isFetching}
                type="primary"
                htmlType="submit"
                style={{
                  paddingRight: 50,
                  paddingLeft: 50,
                  borderRadius: 50,
                  height: 40,
                }}
              />
            </Form>
          </div>
        )}
      </OnboardingLayout>
    </div>
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
});

export default AddBusiness;

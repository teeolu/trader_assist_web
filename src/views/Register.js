import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, notification } from 'antd';
import { useSelector } from 'react-redux';

import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../redux/auth/registerReducer';
import OnboardingLayout from '../components/OnboardingLayout';
import Buttons from '../atoms/Buttons';
import { Api } from '../repository/Api';
import { notificationConfigs } from '../constants/ToastNotifincation';
import AddBusiness from './AddBusiness';

const Register = () => {
  const [businessAsStaff, setBusinessAsStaff] = useState(null);
  const [form] = Form.useForm();

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);

  useEffect(() => {
    if (status === Status.REGISTER_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  function onFinish(values) {
    const { confirmPassword, ...formVal } = values;

    Api.AuthRepository.register({ formData: formVal }).then((data) => {
      setBusinessAsStaff(data.businessAsStaff);
    });
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  return (
    <div style={{ position: 'relative' }}>
      <OnboardingLayout
        title="Register on Trader assist"
        caption="Enter your details below"
        actionTxt="sign in"
        id="rgister"
        onSubmit={onFinish}>
        <Form
          form={form}
          name="register"
          layout="vertical"
          hideRequiredMark={true}
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
          scrollToFirstError>
          <Form.Item
            name="fullName"
            label="Full name"
            rules={[{ required: true, message: 'Full name is required!' }]}>
            <Input size="large" placeholder="e.g John Doe" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              { required: true, message: 'Email is required!' },
              {
                type: 'email',
                message: 'Requires a valid email',
              },
            ]}>
            <Input size="large" placeholder="e.g myemail@emailprovider.com" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[{ required: true, message: 'Phone number is required!' }]}>
            <Input size="large" placeholder="e.g 090987654321" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Password is required!' },
                  // {
                  //   type: 'email',
                  //   message: 'Requires a valid email',
                  // },
                ]}>
                <Input.Password size="large" placeholder="Enter a unique password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                label="Confirm password"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
                ]}>
                <Input.Password size="large" placeholder="Enter a unique password" />
              </Form.Item>
            </Col>
          </Row>
          <Buttons
            btnText="Sign in"
            isLoading={isFetching}
            style={{
              paddingRight: 50,
              paddingLeft: 50,
              borderRadius: 50,
              height: 40,
            }}
            type="primary"
            htmlType="submit"
          />
        </Form>
      </OnboardingLayout>
      <AddBusiness businessAsStaff={businessAsStaff} />
    </div>
  );
};

export default Register;

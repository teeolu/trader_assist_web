import React, { useEffect } from 'react';
import { Form, Input, Card, notification } from 'antd';
import { useSelector } from 'react-redux';

import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../redux/auth/loginReducer';
import OnboardingLayout from '../components/OnboardingLayout';
import Buttons from '../atoms/Buttons';
import { Api } from '../repository/Api';

const Login = () => {
  const [form] = Form.useForm();

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);

  useEffect(() => {
    if (status === Status.REGISTER_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
      });
    }
  }, [status]);
  console.log('Success: isFetching ', isFetching);

  function onFinish(values) {
    console.log('Success:', values);

    Api.AuthRepository.login({ formData: values });
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  return (
    <OnboardingLayout
      title="Login to Trader assist"
      caption="Enter your details below"
      actionTxt="sign in"
      id="login"
      onSubmit={onFinish}>
      <Form
        form={form}
        name="joinWaitList"
        layout="vertical"
        hideRequiredMark={true}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}>
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
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Password is required!' },
            // {
            //   type: 'email',
            //   message: 'Requires a valid email',
            // },
          ]}>
          <Input size="large" placeholder="Enter a unique password" />
        </Form.Item>
        <Buttons
          btnText="Sign in"
          isLoading={isFetching}
          style={{
            paddingRight: 50,
            paddingLeft: 50,
            borderRadius: 50,
            height: 40,
          }}
        />
      </Form>
    </OnboardingLayout>
  );
};

export default Login;

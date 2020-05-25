import React from 'react';
import { Form, Input, Card } from 'antd';

import OnboardingLayout from '../components/OnboardingLayout';
import Buttons from '../atoms/Buttons';

const Login = () => {
  const [form] = Form.useForm();

  function onFinish(values) {
    console.log('Success:', values);
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

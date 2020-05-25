import React from 'react';
import { Form, Input, Row, Col } from 'antd';

import OnboardingLayout from '../components/OnboardingLayout';
import Buttons from '../atoms/Buttons';

const Register = () => {
  const [form] = Form.useForm();

  function onFinish(values) {
    console.log('Success:', values);
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  return (
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
          name="phoneNo"
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

export default Register;

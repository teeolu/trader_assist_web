import React, { useEffect } from 'react';
import { Form, Input, notification, Button } from 'antd';
import { useSelector } from 'react-redux';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';

import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investor/editInvestorReducer';
import Buttons from '../../atoms/Buttons';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { colors, typography, boxShadows, fontsize } from '../../Css';
import history from '../../routes/history';
import { getCurrentInvestorState } from '../../redux/investor/getInvestorReducer';
import { RESET_EDIT_INVESTOR_REQUEST } from '../../redux/investor/actionTypes';
import store from '../../redux/store';

const EditInvestor = (props) => {
  let {
    match: {
      params: { investorId },
    },
  } = props;
  const [form] = Form.useForm();
  const classes = useStyles();

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);

  const investor = useSelector(getCurrentInvestorState)[investorId];

  useEffect(() => {
    if (status === Status.EDIT_INVESTOR_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    if (status === Status.EDIT_INVESTOR_REQUEST_SUCCESS) {
      notification.success({
        message: errorMsg,
        ...notificationConfigs,
      });
      store.dispatch({
        type: RESET_EDIT_INVESTOR_REQUEST,
      });
      history.goBack();
    }
  }, [status]);

  useEffect(() => {
    if (!!investorId && !investor) {
      Api.InvestorRepository.getInvestor({
        params: {
          investorId,
        },
      });
    }
  }, [investorId]);

  function onFinish(values) {
    Api.InvestorRepository.editInvestor({
      formData: { ...investor, ...values },
    });
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  const initialValues = {
    fullName: !!investor ? investor.fullName : '',
    email: !!investor ? investor.email : '',
    phoneNumber: !!investor ? investor.phoneNumber : '',
  };

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
          <b>Edit {!!investor ? investor.fullName : 'investor'}</b>
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
          initialValues={initialValues}
          scrollToFirstError>
          <Form.Item
            name="fullName"
            label="Investor name"
            rules={[{ required: true, message: 'Investor name is required!' }]}>
            <Input autoFocus size="large" placeholder="e.g John Doe" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Investor email"
            rules={[
              { required: true, message: 'Investor email is required!' },
              // {
              //   type: 'email',
              //   message: 'Requires a valid email',
              // },
            ]}>
            <Input size="large" placeholder="Enter an email addres" />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Investor phone number">
            <Input size="large" placeholder="e.g 090987654321" />
          </Form.Item>
          <Buttons
            btnText="Save edit"
            size="small"
            textColor={colors.pinkDark}
            htmlType="submit"
            isLoading={isFetching}
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

export default EditInvestor;

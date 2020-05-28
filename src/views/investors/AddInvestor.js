import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Col, notification, Button, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import { CheckCircleTwoTone, ArrowLeftOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';

import {
  getIsFetchingState,
  getAddedInvestorState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investor/addInvestorReducer';
import { getCurrentBusinessState } from '../../redux/business/addBusinessReducer';
import Buttons from '../../atoms/Buttons';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { colors, typography, boxShadows, fontsize } from '../../Css';
import history from '../../routes/history';
import { PrivatePaths } from '../../routes';
import Auth from '../../utils/auth';

const AddInvestor = ({}) => {
  const [notifyInvestor, setNotifyInvestor] = useState(false);
  const [form] = Form.useForm();
  const classes = useStyles();
  const { confirm } = Modal;

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const addedInvestor = useSelector(getAddedInvestorState);
  const currentBusiness = useSelector(getCurrentBusinessState);

  console.log('addedInvestor addedInvestor addedInvestor ', currentBusiness, addedInvestor);

  useEffect(() => {
    if (status === Status.ADD_INVESTOR_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }

    if (status === Status.ADD_INVESTOR_REQUEST_SUCCESS) {
      confirm({
        title: `${addedInvestor.fullName} added successfully`,
        icon: <CheckCircleTwoTone />,
        content: `Will you like to add an investment for ${addedInvestor.fullName}?`,
        onOk() {
          history.push(`${PrivatePaths.INVESTORS}/new-investment/${addedInvestor._id}`);
        },
        onCancel() {
          history.push(`${PrivatePaths.INVESTORS}/${addedInvestor._id}`);
        },
      });
    }
  }, [status]);

  function onFinish(values) {
    console.log('addedInvestor addedInvestor success ', currentBusiness, Auth.getCurrentBusiness());
    Api.InvestorRepository.addInvestor({
      formData: {
        ...values,
        notifyInvestor,
        businessId: currentBusiness._id,
      },
    }).then((success) => {
      console.log('addedInvestor addedInvestor success ', success);
      if (success === true) {
        Api.InvestorRepository.getInvestor({
          params: {
            investorId: addedInvestor._id,
          },
        });
        Api.InvestorRepository.getInvestors({});
      }
    });
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
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
          <b>Add investor</b>
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
          <Checkbox onChange={(e) => setNotifyInvestor(e.target.checked)}>
            Do you want the investor to be notified?
          </Checkbox>
          <Buttons
            btnText="Add investor"
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

export default AddInvestor;

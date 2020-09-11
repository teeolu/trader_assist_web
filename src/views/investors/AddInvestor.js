import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, notification, Button, Checkbox } from 'antd';
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
import { banksArray } from '../../utils/banksArray';

const { Option } = Select;

const AddInvestor = ({ match }) => {
  const [notifyInvestor, setNotifyInvestor] = useState(false);
  const [selectBank, setSelectBank] = useState('');
  const [form] = Form.useForm();
  const classes = useStyles();
  const { confirm } = Modal;

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const addedInvestor = useSelector(getAddedInvestorState);
  const currentBusiness = useSelector(getCurrentBusinessState);

  useEffect(() => {
    if (status === Status.ADD_INVESTOR_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }

    if (status === Status.ADD_INVESTOR_REQUEST_SUCCESS) {
      form.resetFields();
      confirm({
        title: `${addedInvestor.investorFullName} added successfully`,
        icon: <CheckCircleTwoTone />,
        content: `Will you like to add an investment for ${addedInvestor.investorFullName}?`,
        onOk() {
          history.push(
            `/platform/${currentBusiness.platformId}/investors/${addedInvestor.investorId}/new-investment`,
          );
        },
        cancelText: 'No',
      });
    }
    // eslint-disable-next-line
  }, [status]);

  function onFinish(values) {
    Api.InvestorRepository.addInvestor({
      formData: {
        ...values,
        bank: selectBank,
        notifyInvestor,
        platformId: currentBusiness.platformId,
      },
    }).then((success) => {
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

  function handleSelectChange(bank) {
    setSelectBank(bank.value);
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
          <div style={{ marginBottom: 15 }}>
            <p style={{ marginBottom: 5 }}>Personal information</p>
            <hr />
          </div>
          <Form.Item
            name="investorFullName"
            label="Investor name"
            rules={[{ required: true, message: 'Investor name is required!' }]}>
            <Input autoFocus size="large" placeholder="e.g John Doe" />
          </Form.Item>
          <Form.Item
            name="investorEmail"
            label="Investor email"
            rules={[
              { required: true, message: 'Investor email is required!' },
              {
                type: 'email',
                message: 'Requires a valid email',
              },
            ]}>
            <Input size="large" placeholder="Enter an email addres" />
          </Form.Item>
          <Form.Item
            name="investorPhoneNumber"
            label="Investor phone number"
            rules={[{ required: true, message: 'Investor phone number is required!' }]}>
            <Input size="large" placeholder="e.g 090987654321" />
          </Form.Item>
          <div style={{ marginBottom: 15 }}>
            <p style={{ marginBottom: 5 }}>Bank details</p>
            <hr />
          </div>
          <Form.Item name="investorBank" label="Select bank">
            <Select
              labelInValue
              placeholder="Select bank"
              filterOption={true}
              onChange={handleSelectChange}
              style={{ width: '100%' }}>
              {banksArray.map((bank) => {
                return (
                  <Option value={bank.value} key={bank.id}>
                    {bank.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="investorAccountNumber" label="Account number">
            <Input size="large" placeholder="Nuban account number" />
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

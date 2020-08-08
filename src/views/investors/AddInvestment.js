import React, { useEffect } from 'react';
import { Form, Input, Row, Col, notification, Button, DatePicker, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';

import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investor/addInvestmentReducer';
import Buttons from '../../atoms/Buttons';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import { colors, typography, boxShadows, fontsize } from '../../Css';
import history from '../../routes/history';
import { investmentDuration } from '../../constants/dateFilter';
import { getCurrentBusinessState } from '../../redux/business/addBusinessReducer';
import store from '../../redux/store';
import { RESET_INVESTMENT_REQUEST } from '../../redux/investor/actionTypes';

const AddInvestment = ({ match }) => {
  let {
    params: { investorId },
  } = match;
  const [form] = Form.useForm();
  const classes = useStyles();

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const currentBusiness = useSelector(getCurrentBusinessState);

  useEffect(() => {
    if (status === Status.ADD_INVESTMENT_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    if (status === Status.ADD_INVESTMENT_REQUEST_SUCCESS) {
      store.dispatch({
        type: RESET_INVESTMENT_REQUEST,
      });
      form.resetFields();
      notification.success({
        message: 'Investment was added successfully',
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  function onFinish(values) {
    Api.InvestorRepository.addInvestment({
      formData: {
        ...values,
        investor: investorId,
        startDate: moment(values.startDate).format('YYYY-MM-DD h:mm:ss a'),
        duration: investmentDuration(values.interval),
        businessId: currentBusiness.platformId,
      },
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
          <b>Add investment</b>
        </p>
      </div>
      <div
        style={{
          padding: '20px 100px 50px 50px',
          height: '100%',
          overflowY: 'scroll',
        }}>
        <div
          style={{
            width: '70%',
          }}>
          <Form
            form={form}
            name="register"
            layout="vertical"
            hideRequiredMark={true}
            onFinishFailed={onFinishFailed}
            initialValues={{
              startDate: moment(),
              interval: '1',
            }}
            onFinish={onFinish}
            scrollToFirstError>
            <Form.Item
              name="amount"
              label="Amount invested"
              rules={[{ required: true, message: 'The amount invested is required!' }]}>
              <Input autoFocus size="large" placeholder="e.g 10500" />
            </Form.Item>
            <Form.Item name="interval" label="Interval (In Months)">
              <Input size="large" placeholder="e.g 1 for montly" />
            </Form.Item>
            <Form.Item
              name="percentProfit"
              label="Percent profit per interval"
              rules={[{ required: true, message: 'Percent profit is required!' }]}>
              <Input
                size="large"
                placeholder={`e.g 10 for 10% every ${form.getFieldValue().interval} month`}
              />
            </Form.Item>
            <Form.Item name="duration" label="Investment duration in months">
              <Input size="large" placeholder="e.g 18 for 18 months. No value mean it's infinite" />
            </Form.Item>

            <Row gutter={24} justify="space-between">
              <Col>
                <Form.Item name="startDate" label="Start date">
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Row span={12}>
                  <Form.Item name="recurrent" valuePropName="checked" style={{ marginBottom: 0 }}>
                    <Checkbox>Recurrent?</Checkbox>
                  </Form.Item>
                </Row>
                <Row span={12}>
                  <Form.Item
                    name="notifyInvestor"
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}>
                    <Checkbox>Notify investor?</Checkbox>
                  </Form.Item>
                </Row>
              </Col>
            </Row>
            <Buttons
              btnText="Add investment"
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

import React, { useEffect } from 'react';
import { List, Collapse, Card, notification } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { colors, typography } from '../../../Css';
import {
  getIsFetchingState,
  getInvestorInvestmentsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../../redux/investor/getInvestorInvestmentReducer';
import { notificationConfigs } from '../../../constants/ToastNotifincation';
import { Api } from '../../../repository/Api';
import { getInvestorReturnsState } from '../../../redux/investor/getInvestorReturnReducer';
import { sortBaseOnTime, humanReadableTime } from '../../../utils/time';

const { Panel } = Collapse;

const InvestorInvestments = ({ investor }) => {
  const investorId = investor._id;
  // const classes = useStyles();
  // const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investorsInvestmentsData = useSelector(getInvestorInvestmentsState);
  const investorsReturns = useSelector(getInvestorReturnsState);

  useEffect(() => {
    fetchInvestors();
  }, []);

  useEffect(() => {
    if (status === Status.GET_INVESTOR_INVESTMENT_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  function fetchInvestors() {
    Api.InvestorRepository.getInvestorInvestment({
      params: {
        investorId,
      },
    });
  }

  function generateInvestmentReturn(id) {
    const returns = investorsReturns[investorId].data.filter((el) => el.investment === id);
    return returns;
  }

  return (
    <div>
      {!!investorsInvestmentsData.investments[investorId]
        ? sortBaseOnTime(investorsInvestmentsData.investments[investorId]).map((investment, i) => (
            <Card
              key={investment._id}
              bordered={true}
              style={{ marginTop: i !== 0 ? 15 : 0 }}
              bodyStyle={{ padding: 15 }}>
              <h4
                style={{
                  ...typography.paragraph,
                  fontWeight: 600,
                  letterSpacing: 1,
                  color: investment.isConfirmed ? colors.green : colors.gray,
                }}>
                NGN{investment.amount.toLocaleString()}{' '}
                <span style={{ ...typography.captionMedium }}>
                  on {humanReadableTime(investment.createdAt)}
                </span>
              </h4>
              <p style={{ marginBottom: 10 }}>
                {investment.isConfirmed
                  ? `This investment was confirmed by ${investment.confirmedBy.fullName}`
                  : 'Not yet confirmed'}
              </p>
              <div
                style={{
                  display: 'flex',
                }}>
                <div
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    marginRight: 20,
                  }}>
                  <p>Number of returns</p>
                  <p style={{ ...typography.h3, color: colors.blue }}>
                    {investment.numberOfReturns}
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    paddingLeft: 20,
                    borderLeft: `1px solid ${colors.gray}`,
                  }}>
                  <p>Returns sum</p>
                  <p style={{ ...typography.h3, color: colors.pinkDark }}>
                    NGN{investment.sumOfReturns.toLocaleString()}
                  </p>
                </div>
              </div>
              <Collapse
                bordered={false}
                accordion={true}
                expandIconPosition="right"
                style={{ margin: 0, padding: 0, marginTop: 10, backgroundColor: colors.white }}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined
                    style={{ fontSize: '1.2rem', color: colors.pinkDark }}
                    color={colors.pinkDark}
                    rotate={isActive ? 90 : 0}
                  />
                )}
                className="site-collapse-custom-collapse">
                <Panel
                  style={{ margin: 0, padding: 0 }}
                  header={<p style={{ color: colors.pinkDark }}>See returns</p>}
                  key="1"
                  className="site-collapse-custom-panel">
                  <List
                    itemLayout="horizontal"
                    dataSource={generateInvestmentReturn(investment._id)}
                    renderItem={(returns) => {
                      const {
                        _id,
                        amount,
                        isApproved,
                        isConfirmed,
                        approvedBy,
                        confirmedBy,
                        dueDate,
                        isReturnDue,
                      } = returns;
                      const color = isReturnDue
                        ? isApproved
                          ? isConfirmed
                            ? colors.green
                            : colors.yellow
                          : colors.red
                        : colors.black2;
                      const returnStatus = isReturnDue
                        ? isApproved
                          ? isConfirmed
                            ? 'confirmed'
                            : 'unconfirmed'
                          : 'unapproved'
                        : 'not due';
                      const returnReview = isReturnDue
                        ? isApproved
                          ? isConfirmed
                            ? `Confirmed by ${confirmedBy}`
                            : `Approved by ${approvedBy}, confirm return`
                          : 'Approve this return'
                        : `Due date - ${humanReadableTime(dueDate)}`;
                      return (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <div style={{ display: 'flex' }}>
                                <p>
                                  {amount.toLocaleString()}
                                  <span
                                    style={{
                                      ...typography.captionMedium,
                                      border: `1px solid ${color}`,
                                      borderRadius: 5,
                                      padding: '3px 5px',
                                      color,
                                      marginLeft: 10,
                                      display: 'inline-block',
                                    }}>
                                    {returnStatus}
                                  </span>
                                </p>
                              </div>
                            }
                            description={returnReview}
                          />
                        </List.Item>
                      );
                    }}
                  />
                </Panel>
              </Collapse>
            </Card>
          ))
        : null}
    </div>
  );
};

// const useStyles = makeStyles({});

export default InvestorInvestments;

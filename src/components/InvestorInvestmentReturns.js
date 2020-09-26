import React from 'react';
import { List, Collapse } from 'antd';
import { useSelector } from 'react-redux';

import { colors, typography } from '../Css';
import { getInvestmentsReturnState } from '../redux/investor/getInvestmentReturnsReducer';
import { humanReadableTime } from '../utils/time';
import { Api } from '../repository/Api';

const { Panel } = Collapse;

export default ({ investment, investorId, renderInvestment }) => {
  const investmentReturns = useSelector(getInvestmentsReturnState);
  console.log('generateInvestmentReturn ', investmentReturns);
  function generateInvestmentReturn(investmentId) {
    // Work on this when i have an endpoint
    // console.log('generateInvestmentReturn ', investmentId, investmentReturns);
    // const returns = investmentReturns[investmentId].data;
    return [];
  }

  function handleAccordionChange(investmentId) {
    console.log('generateInvestmentReturn ', investmentId);
    if (typeof investmentId !== 'undefined') {
      Api.InvestorRepository.getInvestmentReturns({ investmentId, params: {} });
    }
  }

  return (
    <Collapse
      onChange={handleAccordionChange}
      bordered={true}
      accordion={true}
      className="site-collapse-custom-collapse">
      <Panel
        header={renderInvestment()}
        key={investment.investmentId}
        showArrow={false}
        className="site-collapse-custom-panel">
        <List
          itemLayout="horizontal"
          dataSource={generateInvestmentReturn(investment.investmentId)}
          renderItem={(returns) => {
            const {
              // _id,
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
  );
};

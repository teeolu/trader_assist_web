import React from 'react';
import { List, Collapse } from 'antd';

import { colors, typography } from '../Css';
// import { getInvestorReturnsState } from '../redux/investor/getInvestorReturnReducer';
import { humanReadableTime } from '../utils/time';

const { Panel } = Collapse;

export default ({ investment, investorId, renderInvestment }) => {
  // const investorsReturns = useSelector(getInvestorReturnsState);
  function generateInvestmentReturn(id) {
    // Work on this when i have an endpoint
    // const returns = investorsReturns[investorId].data.filter((el) => el.investment === id);
    return []; // returns;
  }

  return (
    <Collapse bordered={false} accordion={true} className="site-collapse-custom-collapse">
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

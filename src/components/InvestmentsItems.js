import React from 'react';
import { Row, Col } from 'antd';
import { makeStyles } from '@material-ui/styles';

import { colors, typography, boxShadows } from '../Css';

export default ({ investment }) => {
  const classes = useStyles();
  const color = investment.isConfirmed ? colors.blue : colors.red;
  const tag = investment.isConfirmed ? investment.confirmedBy.fullName : 'unconfirmed';
  const isActiveColor = investment.isActive ? colors.green : colors.red;
  const isActiveTag = investment.isActive ? 'Active' : 'Inactive';
  return (
    <Row key={1} gutter={0} className={classes.activitiesRow}>
      <Col span={15}>
        <p style={{ color: colors.black, width: '80%', margin: 0, letterSpacing: '1px' }}>
          {investment.investmentRef}
        </p>
      </Col>
      <Col span={3}>
        <p style={{ margin: 0, color: colors.black2 }}>
          &#8358;{investment.investmentAmount.toLocaleString()}
        </p>
      </Col>
      <Col span={3}>
        <Row>
          <span
            style={{
              ...typography.captionMedium,
              border: `1px solid ${isActiveColor}`,
              borderRadius: 5,
              padding: '3px 5px',
              color,
              display: 'inline-block',
            }}>
            {isActiveTag}
          </span>
        </Row>
      </Col>
      <Col span={3}>
        <Row>
          <span
            style={
              !investment.isConfirmed
                ? {
                    ...typography.captionMedium,
                    border: `1px solid ${color}`,
                    borderRadius: 5,
                    padding: '3px 5px',
                    color,
                    display: 'inline-block',
                  }
                : null
            }>
            {tag}
          </span>
        </Row>
      </Col>
    </Row>
  );
};

const useStyles = makeStyles({
  activeRow: {
    backgroundColor: colors.pinkLight,
  },
  activitiesRow: {
    padding: 20,
    borderBottom: boxShadows.border,
    cursor: 'pointer',
    transition: '.3s all',
    '&:hover': { backgroundColor: colors.gray3 },
  },
});

import React from 'react';
import { Pagination } from 'antd';

export default ({ total, onChange }) => {
  return <Pagination style={{ margin: 20 }} defaultCurrent={2} total={total} onChange={onChange} />;
};

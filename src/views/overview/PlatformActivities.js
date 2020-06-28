import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notification, Drawer, Select } from 'antd';

import {
  getIsFetchingState,
  getBusinessHistoryState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/business/businessHistoryReducer';
import { typography, colors } from '../../Css';
import { Api } from '../../repository/Api';
import { overviewOptions } from '../../constants/dateFilter';
import { notificationConfigs } from '../../constants/ToastNotifincation';
import Activities from '../../components/Activities';

const { Option } = Select;

const PlatformActivities = () => {
  const [selectedOption, setSelectedOption] = useState(overviewOptions[0]);
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const businessHistory = useSelector(getBusinessHistoryState);

  useEffect(() => {
    fetchBusinessHistory();
  }, [selectedOption.option]);

  useEffect(() => {
    if (status === Status.GET_INVESTORS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
  }, [status]);

  function fetchBusinessHistory() {
    Api.BusinessRepository.getBusinessHistory({ selectedOption });
  }

  function handleChange(value) {
    const option = overviewOptions.find((el) => el.option === value);
    setSelectedOption(option);
  }

  return (
    <div>
      <h3 style={{ ...typography.paragraph, color: colors.black2, fontWeight: 600 }}>
        Recent activities
      </h3>
      <Activities
        activities={businessHistory.history[selectedOption.option]}
        seeMoreAction={() => setDrawerIsVisible(true)}
      />
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ marginBottom: 0 }}>Activities</p>
            <Select
              defaultValue={selectedOption.option}
              style={{ width: 120 }}
              onChange={handleChange}>
              {overviewOptions.map((option) => (
                <Option value={option.option}>{option.option}</Option>
              ))}
            </Select>
          </div>
        }
        placement="right"
        closable={false}
        onClose={() => setDrawerIsVisible(false)}
        destroyOnClose={true}
        maskStyle={{ backgroundColor: 'transparent' }}
        width={400}
        keyboard={true}
        visible={drawerIsVisible}>
        <Activities activities={businessHistory.history[selectedOption.option]} />
      </Drawer>
    </div>
  );
};

export default PlatformActivities;

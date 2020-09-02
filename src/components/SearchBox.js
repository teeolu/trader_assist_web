import React from 'react';
import { Input, AutoComplete } from 'antd';
// import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

// import { getCurrentBusinessState } from '../redux/business/addBusinessReducer';

const { Search } = Input;

const SearchBox = () => {
  // const currentBusiness = useSelector(getCurrentBusinessState);

  const renderTitle = (title) => {
    return (
      <span>
        {title}
        <a
          style={{ float: 'right' }}
          href="https://www.google.com/search?q=antd"
          target="_blank"
          rel="noopener noreferrer">
          more
        </a>
      </span>
    );
  };

  const renderItem = (title, count) => {
    return {
      value: title,
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          {title}
          <span>
            <UserOutlined /> {count}
          </span>
        </div>
      ),
    };
  };

  const options = [
    {
      label: renderTitle('Libraries'),
      options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
  ];

  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      options={options}>
      <Search
        placeholder="Search for investor, investment, and returns"
        onSearch={(value) => console.log(value)}
        enterButton
        size="large"
        style={{
          width: 500,
        }}
      />
    </AutoComplete>
  );
};

export default SearchBox;

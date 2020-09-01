import React from 'react';
import { Input, AutoComplete } from 'antd';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

import { getCurrentBusinessState } from '../redux/business/addBusinessReducer';

const { Search } = Input;

const SearchBox = () => {
  const currentBusiness = useSelector(getCurrentBusinessState);

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
    {
      label: renderTitle('Solutions'),
      options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
      label: renderTitle('Articles'),
      options: [renderItem('AntDesign design language', 100000)],
    },
  ];

  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={{ width: 250 }}
      // children={(...arg) => {
      //   console.log('arg arg ', arg);
      //   return <div>Render your component here</div>;
      // }}
      options={options}>
      <Search
        placeholder="input search text"
        onSearch={(value) => console.log(value)}
        enterButton
        style={{
          marginLeft: 50,
        }}
      />
    </AutoComplete>
  );
};

export default SearchBox;

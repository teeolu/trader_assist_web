import React, { useState, useEffect } from 'react';
import { Input, AutoComplete } from 'antd';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

import { getCurrentBusinessState } from '../redux/business/addBusinessReducer';
import { instance } from '../repository/Api';

const { Search } = Input;

const SearchBox = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [loadingState, setLoadingState] = useState(false);
  const currentBusiness = useSelector(getCurrentBusinessState);

  useEffect(() => {
    if (!!searchKeyword) search();
    // eslint-disable-next-line
  }, [searchKeyword]);

  function search() {
    // setLoadingState(true);
    instance
      .get(`/search/platform`, {
        params: { keyword: searchKeyword, limit: 10, platformId: currentBusiness.platformId },
      })
      .then((response) => {
        const { data, status } = response.data;
        console.log('response data ', data);
        if (status) {
          setSearchResult((prevState) => [...prevState, ...data.docs]);
        } else {
          // setErrorMessage(message);
        }
        // setLoadingState(false);
      })
      .catch((err) => {
        console.log('response err ', err);
        // setErrorMessage(err.message);
        // setLoadingState(false);
      });
  }

  function handleSearchChange(evt) {
    setSearchKeyword(evt.target.value);
  }

  function renderTitle() {
    return (
      <span>
        <a
          style={{ float: 'right' }}
          href="https://www.google.com/search?q=antd"
          target="_blank"
          rel="noopener noreferrer">
          more
        </a>
      </span>
    );
  }
  console.log('response searchResult ', searchResult);

  function renderItem(data) {
    return {
      value: data.title,
      label: (
        <div
          style={{
            display: 'flex',
          }}>
          <UserOutlined />
          {data.title}
        </div>
      ),
    };
  }

  const options = [
    {
      label: renderTitle(),
      options: searchResult.map(renderItem),
    },
  ];

  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      options={options}>
      <Search
        placeholder="Search for investor, investment, and returns"
        onSearch={search}
        onChange={handleSearchChange}
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

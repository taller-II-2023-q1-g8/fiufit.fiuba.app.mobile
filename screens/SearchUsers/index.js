import React, { useState } from 'react';
import { func, shape } from 'prop-types';

import { fetchUsersByUsername } from '../../requests';

import SearchUsers from './layout';

export default function SearchUsersScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const fetchData = async (username) => {
    const response = await fetchUsersByUsername(username);
    const json = await response.json();
    console.log(json.message);
    setData(json.message);
  };

  const handleSearchPress = async () => {
    fetchData(search);
  };

  const handleOnSearchChange = (value) => setSearch(value);

  return (
    <SearchUsers
      data={data}
      handleOnSearchChange={handleOnSearchChange}
      handleSearchPress={handleSearchPress}
    />
  );
}

SearchUsersScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import { fetchUsersByUsername } from '../../requests';
import Loader from '../../components/Loader';
import { isEmpty } from '../../utils';

import SearchUsers from './layout';

export default function SearchUsersScreen({ navigation }) {
  const [search, setSearch] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUsersByUsername('');
      const json = await response.json();
      setData(json.message);
    }
    fetchData();
  }, []);

  const filterData = (usernameToSearch) => data.filter((username) => username.includes(usernameToSearch));

  const handleOnSearchChange = (usernameToSearch) => {
    setSearch(isEmpty(usernameToSearch) ? '' : filterData(usernameToSearch));
  };

  const handleItemPress = (username) => {
    console.log({ username });
    navigation.navigate('HOLA', { username });
  };

  return (
    <>
      <Loader loading={isEmpty(data)} />
      {!isEmpty(data) && (
        <SearchUsers
          handleItemPress={handleItemPress}
          data={search}
          handleOnSearchChange={handleOnSearchChange}
        />
      )}
    </>
  );
}

SearchUsersScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

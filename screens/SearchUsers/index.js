import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import { fetchUsersByUsername } from '../../requests';
import Loader from '../../components/Loader';
import { isEmpty } from '../../utils';
import texts from '../../texts';
import { useStateValue } from '../../utils/state/state';

import SearchUsers from './layout';

export default function SearchUsersScreen({ navigation }) {
  const [search, setSearch] = useState([]);
  const [data, setData] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUsersByUsername('');
      const json = await response.json();
      setData(json.message);
    }
    fetchData();
  }, []);

  const filterData = (usernameToSearch) =>
    data.filter((username) => username !== state.user.username && username.includes(usernameToSearch));

  const handleOnSearchChange = (usernameToSearch) => {
    setSearch(isEmpty(usernameToSearch) ? '' : filterData(usernameToSearch));
  };

  const handleItemPress = (username) => {
    navigation.navigate(texts.SearchedProfile.name, { username });
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

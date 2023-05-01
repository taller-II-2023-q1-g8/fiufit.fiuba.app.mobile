import React, { useEffect, useState } from 'react';

import { fetchUsersByUsername } from '../../requests';
import Loader from '../../components/Loader';
import { isEmpty } from '../../utils';

import SearchUsers from './layout';

export default function SearchUsersScreen() {
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

  return !isEmpty(data) ? (
    <SearchUsers data={search} handleOnSearchChange={handleOnSearchChange} />
  ) : (
    <Loader />
  );
}

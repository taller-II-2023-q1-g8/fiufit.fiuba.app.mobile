import { shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { fetchUserProfileByUsername } from '../../requests';

import SearchedProfile from './layout';

export default function SearchedProfileContainer({ route }) {
  const [data, setData] = useState([]);
  const { username } = route.params;

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserProfileByUsername(username);
      const json = await response.json();
      setData(json.message);
    }
    fetchData();
  }, []);

  return <SearchedProfile data={data} />;
}

SearchedProfileContainer.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired
};

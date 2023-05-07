import { shape } from 'prop-types';
import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import { fetchUserProfileByUsername } from '../../requests';

export default function SearchedProfile({ route }) {
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

  return <Text>Hola {username}!</Text>;
}

SearchedProfile.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired
};

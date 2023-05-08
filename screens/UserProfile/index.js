import React, { useEffect, useState } from 'react';

import { fetchUserProfileByUsername } from '../../requests';
import { useStateValue } from '../../utils/state/state';

import UserProfile from './layout';

export default function UserProfileContainer() {
  const [data, setData] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserProfileByUsername(state.user.username);
      const json = await response.json();
      setData(json.message);
    }
    fetchData();
  }, []);

  return <UserProfile data={data} />;
}

// UserProfileContainer.propTypes = {
//   route: shape({
//     params: shape.isRequired
//   }).isRequired
// };

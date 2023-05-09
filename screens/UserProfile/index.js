import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';

import { fetchUserProfileByUsername } from '../../requests';
import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';

import UserProfile from './layout';

export default function UserProfileContainer({ navigation }) {
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

  const handleEditProfile = () => navigation.navigate(texts.EditUserProfile.name);
  return <UserProfile data={data} handleEditProfile={handleEditProfile} />;
}

UserProfileContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

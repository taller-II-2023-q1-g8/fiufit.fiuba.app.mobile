import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';

import { fetchUserProfileByUsername } from '../../requests';
import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';
import getProfilePicURL from '../../utils/profilePicURL';

import UserProfile from './layout';

export default function UserProfileContainer({ navigation }) {
  const [data, setData] = useState({});
  const [state] = useStateValue();
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfPicUrl = async () => {
    const url = await getProfilePicURL(state.user.username);
    setProfPicUrl(url);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfPicUrl();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserProfileByUsername(state.user.username);
      const json = await response.json();
      setData(json.message);
    }
    fetchData();
  }, []);

  const handleAddStat = () => navigation.navigate(texts.PersonalGoals.name);

  const handleEditProfile = () => navigation.navigate(texts.EditUserProfile.name);
  return (
    <UserProfile
      data={data}
      handleEditProfile={handleEditProfile}
      profPicUrl={profPicUrl}
      loading={loading}
      handleAddStat={handleAddStat}
    />
  );
}

UserProfileContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

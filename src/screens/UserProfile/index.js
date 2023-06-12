import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';

import {
  fetchFollowedUsersByUsername,
  fetchFollowerUsersByUsername,
  fetchUserProfileByUsername
} from '../../requests';
import { useStateValue } from '../../state';
import texts from '../../texts';
import { getProfilePicURL } from '../../utils';

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
      setLoading(true);
      const userResponse = await fetchUserProfileByUsername(state.user.username);
      const userJson = await userResponse.json();
      const followersResponse = await fetchFollowerUsersByUsername(state.user.username);
      const followersJson = await followersResponse.json();
      setData({
        ...userJson.message,
        followers: followersJson.message.length,
        followed: state.followedUsers.length
      });
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddStat = () => navigation.navigate(texts.PersonalGoalsStack.name);
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

import { shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { fetchUserProfileByUsername, followUser, unfollowUser } from '../../requests';
import getProfilePicURL from '../../utils/profilePicURL';
import { useStateValue } from '../../utils/state/state';

import SearchedProfile from './layout';

export default function SearchedProfileContainer({ route }) {
  const [data, setData] = useState({});
  const [state, dispatch] = useStateValue();
  const { username } = route.params;
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const [following, setFollowing] = useState(state.followedUsers && state.followedUsers.includes(username));

  const fetchProfPicUrl = async () => {
    const url = await getProfilePicURL(username);
    setProfPicUrl(url);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfPicUrl();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserProfileByUsername(username);
      const json = await response.json();
      setData(json.message);
      // setFollowing(json.message.following?)
    }
    fetchData();
  }, []);

  const handleFollowPress = async () => {
    setLoading(true);
    await followUser(state.user.username, username);
    const newState = state.followedUsers;
    newState.push(username);
    dispatch({
      type: 'addFollowedUser',
      followedUsers: newState
    });
    setFollowing(true);
    setLoading(false);
    console.log('Following', username);
  };

  const handleUnfollowPress = async () => {
    setLoading(true);
    await unfollowUser(state.user.username, username);
    let newState = state.followedUsers;
    newState = newState.filter((u) => u !== username);
    dispatch({
      type: 'removeFollowedUser',
      followedUsers: newState
    });
    setFollowing(false);
    setLoading(false);
    console.log('Unfollowing', username);
  };

  return (
    <SearchedProfile
      data={data}
      profPicUrl={profPicUrl}
      loading={loading}
      handleFollowPress={handleFollowPress}
      handleUnfollowPress={handleUnfollowPress}
      following={following}
    />
  );
}

SearchedProfileContainer.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired
};

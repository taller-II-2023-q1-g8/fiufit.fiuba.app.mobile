import { shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { fetchUserProfileByUsername } from '../../requests';
import getProfilePicURL from '../../utils/profilePicURL';

import SearchedProfile from './layout';

export default function SearchedProfileContainer({ route }) {
  const [data, setData] = useState({});
  const { username } = route.params;
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

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
    if (following) {
      // unFollow(state.user.username, username)
      console.log('Unfollowing');
    } else {
      // startFollowing(state.user.username, username)
      console.log('Following');
    }
    setFollowing(!following);
  };

  return (
    <SearchedProfile
      data={data}
      profPicUrl={profPicUrl}
      loading={loading}
      handleFollowPress={handleFollowPress}
      following={following}
    />
  );
}

SearchedProfileContainer.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired
};

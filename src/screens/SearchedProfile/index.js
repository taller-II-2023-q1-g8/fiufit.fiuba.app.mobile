import { func, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';

import {
  fetchFollowedUsersByUsername,
  fetchFollowerUsersByUsername,
  fetchTrainersID,
  fetchUserProfileByUsername,
  followUser,
  unfollowUser,
  fetchPlansByTrainerID,
  fetchCompletedPlanMetricsByUsername
} from '../../requests';
import { getProfilePicURL } from '../../utils';
import { useStateValue } from '../../state';
import Loader from '../../components/Loader';
import texts from '../../texts';
import BackgroundImage from '../../assets/Background.jpg';
import { styles } from '../Feed/styles';

import SearchedProfile from './layout';

export default function SearchedProfileContainer({ route, navigation }) {
  const [data, setData] = useState({});
  const { username } = route.params;
  const [state, dispatch] = useStateValue();
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(state.followedUsers && state.followedUsers.includes(username));

  const fetchProfPicUrl = async () => {
    const url = await getProfilePicURL(username);
    setProfPicUrl(url);
  };

  useEffect(() => {
    fetchProfPicUrl();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userResponse = await fetchUserProfileByUsername(username);
      const userJson = await userResponse.json();
      const followersResponse = await fetchFollowerUsersByUsername(username);
      const followersJson = await followersResponse.json();
      const followedResponse = await fetchFollowedUsersByUsername(username);
      const followedJson = await followedResponse.json();
      const trainersResponse = await fetchTrainersID();
      const trainersJson = await trainersResponse.json();
      const id = trainersJson.find((trainer) => trainer.external_id === username);
      const completedPlansResponse = await fetchCompletedPlanMetricsByUsername(username);
      const completedPlans = await completedPlansResponse.json();

      const completedPlansFeedItems = [];
      completedPlans.message.forEach((completedPlan) => {
        completedPlansFeedItems.push({
          type: 'training_plan_completed',
          username,
          title: completedPlan.plan_title,
          date: new Date(completedPlan.created_at)
        });
      });
      completedPlansFeedItems.sort((a, b) => b.date - a.date);
      if (id === undefined) {
        // Fetch de planes realizados x usuario
        setData({
          ...userJson.message,
          followers: followersJson.message.length,
          followed: followedJson.message.length,
          role: 'Athlete',
          completedPlans: completedPlansFeedItems
        });

        setLoading(false);
        return;
      }
      const idMessage = {
        trainer_id: id.id
      };
      const plans = await fetchPlansByTrainerID(idMessage);
      const plansJson = await plans.json();
      setData({
        ...userJson.message,
        followers: followersJson.message.length,
        followed: followedJson.message.length,
        role: 'Trainer',
        completedPlans: completedPlansFeedItems,
        createdPlans: plansJson
      });
      await fetchProfPicUrl();
      console.log('Finished fetching!!');
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleFollowPress = async () => {
    setLoading(true);
    await followUser(state.user.username, username);
    const newState = state.followedUsers;
    newState.push(username);
    dispatch({
      type: 'updateFollowedUsers',
      followedUsers: newState
    });
    setFollowing(true);
    setLoading(false);
  };

  const handleUnfollowPress = async () => {
    setLoading(true);
    await unfollowUser(state.user.username, username);
    let newState = state.followedUsers;
    newState = newState.filter((u) => u !== username);
    console.log(newState);
    dispatch({
      type: 'updateFollowedUsers',
      followedUsers: newState
    });
    console.log(state.followedUsers);
    setFollowing(false);
    setLoading(false);
  };
  const handleTrainingPress = (planID) => {
    navigation.navigate(texts.SearchedTrainingPlan.name, { planID });
  };
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Loader loading={loading} />
        {loading ? null : (
          <SearchedProfile
            data={data}
            loading={loading}
            handleFollowPress={handleFollowPress}
            following={following}
            handleUnfollowPress={handleUnfollowPress}
            profPicUrl={profPicUrl}
            handleTrainingPress={handleTrainingPress}
          />
        )}
      </View>
    </ImageBackground>
  );
}

SearchedProfileContainer.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

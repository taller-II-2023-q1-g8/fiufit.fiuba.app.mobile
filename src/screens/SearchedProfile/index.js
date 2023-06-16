import { func, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { collection, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';

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
import { db } from '../../../firebaseConfig';

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
  const handleTrainingPress = (plan) => {
    navigation.navigate(texts.SearchedTrainingPlan.name, { plan });
  };

  const myUsername = state.user.username;
  function createConvWithUser(otherUsername) {
    const convID =
      myUsername < otherUsername ? `${myUsername}%${otherUsername}` : `${otherUsername}%${myUsername}`;
    const conversationData = {
      participants: [myUsername, otherUsername]
    };
    const conversationRef = doc(db, 'conversations', convID);

    setDoc(conversationRef, conversationData)
      .then(() => {
        const messagesRef = collection(conversationRef, 'messages');
        const emptyDoc = doc(messagesRef, 'init'); // Create an empty document

        return setDoc(emptyDoc, {});
      })
      .then(() => {
        console.log('Conversation created successfully');
      })
      .catch((error) => {
        console.error('Error creating conversation:', error);
      });
  }

  const goToConversation = async (otherUsername, otherUserProfPicUrl) => {
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', myUsername),
      orderBy('lastMessageTime', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const conversations = [];
    querySnapshot.forEach((docu) => {
      const convData = docu.data();
      const otherUser = convData.participants.find((u) => u !== myUsername);
      const conversation = { id: docu.id, data: convData, username: otherUser };
      conversations.push(conversation);
    });

    if (conversations.find((conv) => conv.username === otherUsername) === undefined)
      createConvWithUser(otherUsername);
    navigation.navigate(texts.PrivateMessage.name, { otherUsername, otherUserProfPicUrl });
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
            handleChatPress={goToConversation}
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

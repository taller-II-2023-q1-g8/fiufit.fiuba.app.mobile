import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';
import { Alert } from 'react-native';

import {
  fetchFollowedUsersByUsername,
  fetchFollowerUsersByUsername,
  fetchUserProfileByUsername,
  fetchAthletePlansByID,
  fetchAthletesID,
  requestVerification,
  fetchTrainerByUsername
} from '../../requests';
import { useStateValue } from '../../state';
import texts from '../../texts';
import { getProfilePicURL } from '../../utils';
import { auth, storage } from '../../../firebaseConfig';

import TrainerProfile from './layout';

export default function TrainerProfileContainer({ navigation }) {
  const [data, setData] = useState({});
  const [state, dispatch] = useStateValue();
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [profPicLoading, setProfPicLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [athleteID, setAthleteID] = useState(null);

  const fetchProfPicUrl = async () => {
    const url = await getProfilePicURL(state.user.username);
    setProfPicUrl(url);
    setProfPicLoading(false);
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
      const trainerResponse = await fetchTrainerByUsername(state.user.username);
      const trainerJson = await trainerResponse.json();
      console.log('ALOHA', trainerJson);
      let trainerVerification = -1;
      if (trainerJson.verification !== undefined) {
        trainerVerification = trainerJson.verification;
      }
      /*
       * if trainerJsonerror or verification === verificado
       * canVerify false
       * else
       * if verification !== ya verificado
       * canVerify true
       */
      const AthletesResponse = await fetchAthletesID();
      const athletesJson = await AthletesResponse.json();
      const foundAthlete = await athletesJson.find((athlete) => athlete.external_id === state.user.username);
      setAthleteID(foundAthlete.id);
      const plansResponse = await fetchAthletePlansByID(athleteID);
      const plansJson = await plansResponse.json();
      let likesTotales = 0;
      let likePromedio = 0;
      let averageCalification = null;
      let plansWithCalification = 0;
      let bestCalificationPlan = null;
      let mostLikedPlan = null;
      if (state.plansData.length > 0) {
        state.plansData.map((plan) => (likesTotales += plan.likes));
        likePromedio = likesTotales / state.plansData.length;
        // eslint-disable-next-line array-callback-return
        state.plansData.map((plan) => {
          if (typeof plan.average_calification === 'number') {
            console.log(plan.averageCalification);
            averageCalification += plan.average_calification;
            plansWithCalification += 1;
          }
        });
        if (plansWithCalification > 0) {
          averageCalification /= plansWithCalification;
        }
        bestCalificationPlan = state.plansData.filter(
          (plan) => typeof plan.average_calification === 'number'
        );
        if (bestCalificationPlan.length > 0) {
          bestCalificationPlan = bestCalificationPlan.reduce((acc, currentValue) =>
            acc.average_calification > currentValue.average_calification ? acc : currentValue
          );
        } else {
          bestCalificationPlan = null;
        }
        mostLikedPlan = state.plansData.reduce((acc, currentValue) =>
          acc.likes > currentValue.likes ? acc : currentValue
        );
      }
      console.log(trainerVerification);
      setData({
        ...userJson.message,
        followers: followersJson.message.length,
        followed: state.followedUsers.length,
        plans: plansJson,
        likesTotales,
        likePromedio,
        averageCalification,
        bestCalificationPlan,
        mostLikedPlan,
        trainerId: trainerJson.id,
        trainerVerification
      });
      setLoading(false);
    }
    fetchData();
  }, [state.user, state.plansData]);

  const handleAddStat = () => navigation.navigate(texts.PersonalGoalsStack.name);
  const handlePickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1
    });

    const cloudProfPicPath = 'verifications'.concat('/user_', data.trainerId, '.mp4');
    const cloudProfilePicRef = ref(storage, cloudProfPicPath);
    if (!result.cancelled) {
      try {
        const response = await fetch(result.uri);
        const blob = await response.blob();
        await uploadBytes(cloudProfilePicRef, blob);
      } catch (error) {
        Alert.alert("Couldn't upload video!");
      }
      // Hacer la llamada que pidio
      await requestVerification(data.trainerId);
    }
  };
  const handleEditProfile = () => navigation.navigate(texts.EditUserProfile.name);
  const handlePlanPress = (itemData) => {
    if (itemData.blocked === 'true') {
      Alert.alert(texts.BlockedPlan.alert);
    } else {
      navigation.navigate(texts.TrainerPlanView.name, { itemData });
    }
  };
  const handleSignOutPress = async () => {
    setLoading(true);
    try {
      // Si la sesion actual es de un usuario federado hay que salir de su cuenta de google

      if (auth.currentUser.providerData[0].providerId === 'google.com') {
        await GoogleSignin.revokeAccess();
      }
      await signOut(auth);
    } catch (error) {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const handleTrainerHome = () => {
    dispatch({
      type: 'changeCurrentStack',
      athleteScreen: true
    });
  };

  return (
    <TrainerProfile
      data={data}
      handleEditProfile={handleEditProfile}
      profPicUrl={profPicUrl}
      loading={loading || profPicLoading}
      handleAddStat={handleAddStat}
      handlePlanPress={handlePlanPress}
      handleSignOutPress={handleSignOutPress}
      handleTrainerHome={handleTrainerHome}
      handlePickVideo={handlePickVideo}
    />
  );
}

TrainerProfileContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

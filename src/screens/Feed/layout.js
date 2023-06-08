import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { bool, func, array } from 'prop-types';

import texts from '../../texts';
import Loader from '../../components/Loader';
import manPic from '../../assets/man.jpeg';
import { getProfilePicURL } from '../../utils';
import defaultProfPic from '../../assets/profile-pic-def.png';
import BackgroundImage from '../../assets/Background.jpg';

import { scrollviewStyle, styles } from './styles';

const feedTexts = texts.Feed;

function dateToDisplayString(date) {
  const now = new Date();
  const milisegundosPasados = now - date;
  const segundosPasados = Math.floor(milisegundosPasados / 1000);
  const minutosPasados = Math.floor(segundosPasados / 60);
  const horasPasadas = Math.floor(minutosPasados / 60);
  const diasPasados = Math.floor(horasPasadas / 24);
  const semanasPasadas = Math.floor(diasPasados / 7);
  const mesesPasados = Math.floor(diasPasados / 30);

  if (segundosPasados < 60) {
    return `Hace ${segundosPasados} segundos`;
  }
  if (minutosPasados < 60) {
    return `Hace ${minutosPasados} minutos`;
  }
  if (horasPasadas < 24) {
    return `Hace ${horasPasadas} horas`;
  }
  if (diasPasados < 7) {
    return `Hace ${diasPasados} días`;
  }
  if (semanasPasadas < 5) {
    return `Hace ${semanasPasadas} semanas`;
  }
  if (mesesPasados < 12) {
    return `Hace ${mesesPasados} meses`;
  }

  return 'Hace más de un año';
}

function TrainingFinished(item, handleUserProfilePress) {
  const [profPicUrl, setProfPicUrl] = useState(null);
  const fetchProfPicUrl = async (searchedUsername) => {
    const url = await getProfilePicURL(searchedUsername);
    setProfPicUrl(url);
  };

  useEffect(() => {
    fetchProfPicUrl(item.username);
  }, [item]);

  return (
    <View style={styles.trainingCompletedContainer}>
      <View style={styles.trainingCompletedHeader}>
        <View style={styles.profilePicture}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleUserProfilePress(item.username)}>
            {profPicUrl !== null ? (
              <Image source={{ uri: profPicUrl }} style={styles.userPhoto} />
            ) : (
              <Image source={defaultProfPic} style={styles.userPhoto} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.usernameContainer}>
          <View style={styles.usernameWrapper}>
            <Text style={styles.usernameText}>{item.username}</Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateText}>{dateToDisplayString(item.date)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.border} />
      <View style={styles.trainingCompletedBody}>
        <View style={styles.planInfoContainer}>
          <View style={styles.planDetails}>
            <Text style={styles.planCompletedText}>Plan Completado!</Text>
            <Text style={styles.planName}>{item.title}</Text>
            <Text style={styles.planDifficulty}>Dificultad: Díficil</Text>
            <Text style={styles.planDifficulty}>Tags: Ejemplo Ejemplo2</Text>
            <Text style={styles.planDifficulty}>Músculos: Abs</Text>
          </View>
          <Image source={manPic} style={styles.planImage} />
        </View>
      </View>
    </View>
  );
}
function FeedItem({ feedItem }, handleUserProfilePress) {
  console.log(feedItem);
  switch (feedItem.type) {
    case 'training_plan_completed':
      return TrainingFinished(feedItem, handleUserProfilePress);
    default:
      return null;
  }
}
export default function Feed({ feed, loading, refreshing, onRefresh, handleUserProfilePress }) {
  console.log(feed);
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <StatusBar />
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={scrollviewStyle}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.homeHeader}>
            <Text style={{ ...styles.title, color: 'white' }}>{feedTexts.title}</Text>
          </View>
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            {loading ? null : feed.map((feedItem) => FeedItem({ feedItem }, handleUserProfilePress))}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

Feed.propTypes = {
  feed: array,
  loading: bool.isRequired,
  refreshing: bool.isRequired,
  onRefresh: func.isRequired,
  handleUserProfilePress: func
};

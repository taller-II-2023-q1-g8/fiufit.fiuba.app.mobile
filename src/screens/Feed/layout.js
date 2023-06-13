import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { array, bool, func } from 'prop-types';

import { colors } from '../../colors';
import { getProfilePicURL } from '../../utils';
import BackgroundImage from '../../assets/Background.jpg';
import defaultProfPic from '../../assets/profile-pic-def.png';
import Loader from '../../components/Loader';
import manPic from '../../assets/man.jpeg';
import texts from '../../texts';

import { scrollviewStyle, styles } from './styles';

const feedTexts = texts.Feed;

export function dateToDisplayString(date) {
  const now = new Date();
  const milisegundosPasados = now - date;
  const segundosPasados = Math.floor(milisegundosPasados / 1000);
  const minutosPasados = Math.floor(segundosPasados / 60);
  const horasPasadas = Math.floor(minutosPasados / 60);
  const diasPasados = Math.floor(horasPasadas / 24);
  const semanasPasadas = Math.floor(diasPasados / 7);
  const mesesPasados = Math.floor(diasPasados / 30);

  if (segundosPasados <= 0) {
    return `Justo Ahora`;
  }
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

function TrainingFinished(item, handleUserProfilePress, handlePlanPress, type) {
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
            <Text style={styles.planCompletedText}>{type}</Text>
            <Text style={styles.planName}>{item.title}</Text>
            <Text style={styles.planDifficulty}>Dificultad: {item.difficulty}</Text>
            <Text style={styles.planDifficulty}>Tags: {item.tags}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handlePlanPress(item.id)}>
            <Image source={manPic} style={styles.planImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
function FeedItem({ feedItem }, handleUserProfilePress, handlePlanPress) {
  switch (feedItem.type) {
    case 'training_plan_completed':
      return TrainingFinished(feedItem, handleUserProfilePress, handlePlanPress, 'Plan completado!');
    case 'created_plan':
      return TrainingFinished(feedItem, handleUserProfilePress, handlePlanPress, 'Nuevo plan creado!');
    default:
      return null;
  }
}
export default function Feed({
  feed,
  loading,
  refreshing,
  onRefresh,
  handleUserProfilePress,
  handlePlanPress
}) {
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={scrollviewStyle}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            {loading
              ? null
              : feed.map((feedItem) => FeedItem({ feedItem }, handleUserProfilePress, handlePlanPress))}
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
  handleUserProfilePress: func,
  handlePlanPress: func
};

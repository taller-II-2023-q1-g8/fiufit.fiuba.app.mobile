import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { bool, func, array } from 'prop-types';

import texts from '../../texts';
import Loader from '../../components/Loader';
import manPic from '../../assets/man.jpeg';

import { scrollviewStyle, styles } from './styles';

function handleAux() {
  console.log('woo');
}

const feedTexts = texts.Feed;
function TrainingFinished(item) {
  return (
    <View style={styles.trainingCompletedContainer}>
      {/* Usar la info de 'item' */}
      <View style={styles.trainingCompletedHeader}>
        {/* Foto del usuario, Nombre del usuario, fecha */}
        <Text>{item.username}</Text>
        <Text>{item.completionDate.slice(0, 10)}</Text>
      </View>
      <View style={styles.border} />
      <View style={styles.trainingCompletedBody}>
        {/* Nombre del plan completado, más info del plan(tags, musculos, dificultad). Foto del plan */}
        <Text>Plan Completado</Text>
        <Text>{item.title}</Text>
      </View>
    </View>
  );
}
function FeedItem({ feedItem }) {
  console.log(feedItem);
  switch (feedItem.type) {
    case 'training_plan_completed':
      return TrainingFinished(feedItem);
    default:
      return null;
  }
}
export default function Feed({ feed, loading, refreshing, onRefresh }) {
  console.log(feed);
  return (
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
          <Text style={styles.goalsTitle}>{feedTexts.yourFollowingTitle}</Text>
          {loading ? null : feed.map((feedItem) => FeedItem({ feedItem }))}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

Feed.propTypes = {
  feed: array,
  loading: bool.isRequired,
  refreshing: bool.isRequired,
  onRefresh: func.isRequired
};

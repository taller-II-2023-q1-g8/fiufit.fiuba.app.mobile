import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, RefreshControl, ScrollView, Text, View } from 'react-native';
import { bool, func, array } from 'prop-types';

import texts from '../../texts';
import Loader from '../../components/Loader';

import { scrollviewStyle, styles } from './styles';

const feedTexts = texts.Feed;
function TrainingFinished(item) {
  return (
    <View>
      <Text>
        {item.username} {item.title}
      </Text>
    </View>
  );
}
function FeedItem({ feedItem }) {
  console.log(feedItem);
  switch (feedItem.type) {
    case 'training_finished':
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

import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { array, bool, func, string, object } from 'prop-types';

import Loader from '../../components/Loader';
import { getProfilePicURL } from '../../utils';
import defaultProfPic from '../../assets/profile-pic-def.png';
import newConvIcon from '../../assets/blue-plus-sign.png';
import Feed from '../Feed/layout';

import { styles } from './styles';

function ConversationItem({ username, conversation, handleOnItemPress }) {
  const [profPicUrl, setProfPicUrl] = useState(null);
  const fetchProfPicUrl = async (searchedUsername) => {
    const url = await getProfilePicURL(searchedUsername);
    setProfPicUrl(url);
  };
  console.log(username);
  useEffect(() => {
    fetchProfPicUrl(username);
  }, []);

  return (
    <View>
      <TouchableOpacity
        key={username}
        activeOpacity={0.8}
        onPress={() => handleOnItemPress(username, profPicUrl)}
      >
        <View style={styles.item}>
          {profPicUrl !== null ? (
            <Image source={{ uri: profPicUrl }} style={styles.profilePic} />
          ) : (
            <Image source={defaultProfPic} style={styles.profilePic} />
          )}
          <View style={{ display: 'flex' }}>
            <Text style={styles.profileName}>{username}</Text>
            <Text style={styles.timeOfLastMsg}>Hace 3 días</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function Messaging({ conversations, loading, handleOnItemPress, newConversation }) {
  return (
    <ScrollView>
      <View>
        <Loader loading={loading} />
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            username={conversation.username}
            conversation={conversation.data}
            handleOnItemPress={handleOnItemPress}
          />
        ))}
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.6} onPress={newConversation}>
            <Image source={newConvIcon} style={styles.newConvPic} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

ConversationItem.propTypes = {
  conversation: object,
  username: string,
  handleOnItemPress: func.isRequired
};

Messaging.propTypes = {
  conversations: array,
  loading: bool.isRequired,
  handleOnItemPress: func.isRequired,
  newConversation: func.isRequired
};

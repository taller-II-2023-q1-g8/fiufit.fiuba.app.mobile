import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { array, bool, func, string, object } from 'prop-types';

import Loader from '../../components/Loader';
import { getProfilePicURL } from '../../utils';
import defaultProfPic from '../../assets/profile-pic-def.png';
import newConvIcon from '../../assets/blue-plus-sign.png';
import SearchUsers from '../Explore/search_users_layout';
import { dateToDisplayString } from '../Feed/layout';
import { fetchPlans, fetchTrainersID, fetchUsersByUsername } from '../../requests';
import { useStateValue } from '../../state';

import { styles } from './styles';

function ConversationItem({ username, conversation, handleOnItemPress }) {
  console.log(conversation.lastMessageTime.toDate());
  const convDate = conversation.lastMessageTime.toDate();
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
            <Text style={styles.timeOfLastMsg}>{dateToDisplayString(convDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export function RecipientSelectionModal({ onClose, showRecipientModal, goToConversation }) {
  const [usernames, setUsernames] = useState([]);
  const [filteredUsernames, setFilteredUsernames] = useState([]);
  const [state] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      const usersResponse = await fetchUsersByUsername('');
      const usersJson = await usersResponse.json();
      const trainersResponse = await fetchTrainersID();
      const trainersJson = await trainersResponse.json();
      console.log(trainersJson);
      // Get de usuarios no traiga admins
      const users = usersJson.message
        .filter((username) => username !== state.user.username)
        .map((username) => ({
          username,
          role: trainersJson.find((trainer) => trainer.external_id === username) ? 'Trainer' : 'Athlete'
        }));
      console.log(users);
      setUsernames(users);
      setFilteredUsernames(users);
    }
    fetchData();
  }, []);

  const [refreshingUsers, setRefreshingUsers] = useState(false);
  const onRefreshUsers = React.useCallback(async () => {
    setRefreshingUsers(true);
    await fetchUsersByUsername('')
      .then((response) => response.json())
      .then((fetchedUsernames) => {
        setUsernames(fetchedUsernames.message);
        setFilteredUsernames(fetchedUsernames.message);
      });
    setRefreshingUsers(false);
  }, []);

  const handleOnUsernameChange = (newUsernameQuery) => {
    setFilteredUsernames(
      usernames.filter(
        (user) =>
          user.username !== state.user.username &&
          user.username.toLowerCase().includes(newUsernameQuery.toLowerCase())
      )
    );
  };

  return (
    <View>
      <Modal visible={showRecipientModal} transparent animationType="fade" onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.searchContainer}>
            <SearchUsers
              handleItemPress={goToConversation}
              data={filteredUsernames}
              handleOnSearchChange={handleOnUsernameChange}
              refreshing={refreshingUsers}
              onRefresh={onRefreshUsers}
            />
          </View>
          {/* Render the modal UI for recipient selection */}
          {/* Include input fields, buttons, or any other necessary UI components */}
        </View>
      </Modal>
    </View>
  );
}

RecipientSelectionModal.propTypes = {
  onClose: func.isRequired,
  showRecipientModal: bool.isRequired,
  goToConversation: func.isRequired
};

export default function Messaging({
  conversations,
  loading,
  handleOnItemPress,
  newConversation,
  showRecipientModal
}) {
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
        {!showRecipientModal && (
          <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} onPress={newConversation}>
              <Image source={newConvIcon} style={styles.newConvPic} />
            </TouchableOpacity>
          </View>
        )}
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
  newConversation: func.isRequired,
  showRecipientModal: bool
};

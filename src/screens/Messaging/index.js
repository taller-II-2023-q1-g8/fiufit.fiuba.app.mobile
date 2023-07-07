import { func, shape } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, setDoc, doc, onSnapshot, orderBy } from 'firebase/firestore';
import { View, ImageBackground } from 'react-native';

import { useStateValue } from '../../state';
import texts from '../../texts';
import { getProfilePicURL } from '../../utils';
import { db } from '../../../firebaseConfig';
import BackgroundImage from '../../assets/Background.jpg';

import Messaging, { RecipientSelectionModal } from './layout';
import { styles } from './styles';

function MessagingScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state] = useStateValue();
  const myUsername = state.user.username;

  useEffect(() => {
    setLoading(true);

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', myUsername),
      orderBy('lastMessageTime', 'desc')
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedConversations = [];

        snapshot.forEach((docu) => {
          const convData = docu.data();
          const otherUsername = convData.participants.find((username) => username !== myUsername);
          const conversation = { id: docu.id, data: convData, username: otherUsername };
          fetchedConversations.push(conversation);
        });

        setConversations(fetchedConversations);
        console.log('ASdasd');
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching conversations:', error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe(); // Cleanup the subscription when the component unmounts
    };
  }, []);

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

  const [showRecipientModal, setShowRecipientModal] = useState(false);
  function goToConversation(otherUsername, otherUserProfPicUrl) {
    if (conversations.find((conv) => conv.username === otherUsername) === undefined)
      createConvWithUser(otherUsername);
    navigation.navigate(texts.PrivateMessage.name, { otherUsername, otherUserProfPicUrl });
    setShowRecipientModal(false);
  }

  function newConversation(username) {
    setShowRecipientModal(true);
  }

  return (
    <ImageBackground source={BackgroundImage} styles={styles.background}>
      <View style={styles.backgroundContainer}>
        <Messaging
          conversations={conversations}
          loading={loading}
          handleOnItemPress={goToConversation}
          newConversation={newConversation}
          showRecipientModal={showRecipientModal}
        />
        {showRecipientModal && (
          <RecipientSelectionModal
            onClose={() => setShowRecipientModal(false)}
            showRecipientModal={showRecipientModal}
            goToConversation={goToConversation}
          />
        )}
      </View>
    </ImageBackground>
  );
}

export default MessagingScreen;

MessagingScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

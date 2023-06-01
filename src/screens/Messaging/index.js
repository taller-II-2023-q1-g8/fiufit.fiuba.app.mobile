import { func, shape } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, setDoc } from 'firebase/firestore';

import { useStateValue } from '../../state';
import texts from '../../texts';
import { getProfilePicURL } from '../../utils';
import { db } from '../../../firebaseConfig';

import Messaging from './layout';

function MessagingScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state] = useStateValue();
  const myUsername = state.user.username;

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        console.log(myUsername);
        // Query conversations where the document ID contains the desired username
        const dbRef = collection(db, 'conversations');
        const q = query(dbRef, where('participants', 'array-contains', `${myUsername}`));
        const querySnapshot = await getDocs(q);

        const fetchedConversations = [];
        querySnapshot.forEach((doc) => {
          const convData = doc.data();
          const otherUsername = convData.participants.find((username) => username !== myUsername);
          const conversation = { id: doc.id, data: convData, username: otherUsername };
          fetchedConversations.push(conversation);
        });

        setConversations(fetchedConversations);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  function goToConversation(otherUsername, otherUserProfPicUrl) {
    navigation.navigate(texts.PrivateMessage.name, { otherUsername, otherUserProfPicUrl });
  }

  function newConversation(username) {
    console.log('nueva conv');
  }

  return (
    <Messaging
      conversations={conversations}
      loading={loading}
      handleOnItemPress={goToConversation}
      newConversation={newConversation}
    />
  );
}

export default MessagingScreen;

MessagingScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

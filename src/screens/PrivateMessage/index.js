import { func, shape } from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  Timestamp,
  doc,
  updateDoc
} from 'firebase/firestore';

import { useStateValue } from '../../state';
import texts from '../../texts';
import { getProfilePicURL } from '../../utils';
import { db } from '../../../firebaseConfig';
import SearchedProfileContainer from '../SearchedProfile';

import PrivateMessage from './layout';

export default function MessagingContainer({ route }) {
  const [state] = useStateValue();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { otherUsername, otherUserProfPicUrl } = route.params;
  const myUsername = state.user.username;
  const [myProfPicUrl, setMyProfPicUrl] = useState(null);

  const convID =
    myUsername < otherUsername ? `${myUsername}%${otherUsername}` : `${otherUsername}%${myUsername}`;
  const messagesRef = collection(db, 'conversations', convID, 'messages');

  useEffect(() => {
    setLoading(true);
    const q = query(messagesRef, orderBy('createdAt'), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessages = [];
      snapshot.forEach((docu) => {
        const message = { id: docu.id, data: docu.data() };
        updatedMessages.push(message);
      });
      setMessages(updatedMessages);
      setLoading(false);
    });

    // Fetch profile picture URL
    const fetchProfPicUrl = async () => {
      const url = await getProfilePicURL(myUsername);
      setMyProfPicUrl(url);
    };
    fetchProfPicUrl();

    // Cleanup the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);
  function handleSendMessage() {
    if (/^\s*$/.test(inputText)) {
      console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
      inputRef.current.clear();
      setInputText('');
      return;
    }

    console.log('mandar', inputText);
    const now = Timestamp.fromDate(new Date());
    const message = {
      sender: myUsername,
      receiver: otherUsername,
      createdAt: now,
      text: inputText,
      viewed: false
    };
    addDoc(messagesRef, message)
      .then(() => {
        inputRef.current.clear();
        setInputText('');
        const conversationDocRef = doc(db, 'conversations', convID);
        updateDoc(conversationDocRef, { lastMessageTime: now })
          .then(() => {
            console.log('Last message time updated successfully');
          })
          .catch((error) => {
            console.error('Error updating last message time:', error);
          });
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }

  return (
    <PrivateMessage
      messages={messages}
      loading={loading}
      myUsername={myUsername}
      myProfPicUrl={myProfPicUrl}
      otherUsername={otherUsername}
      otherUserProfPicUrl={otherUserProfPicUrl}
      InputText={inputText}
      setInputText={setInputText}
      inputRef={inputRef}
      handleSendMessage={handleSendMessage}
    />
  );
}

MessagingContainer.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired
};

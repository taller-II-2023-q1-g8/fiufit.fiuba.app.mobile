import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { func, object, string, bool, array } from 'prop-types';

import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';

import { styles } from './styles';

function MessageItem({ message, myUsername, myProfPicUrl, otherUsername, otherUserProfPicUrl }) {
  console.log(message);
  const isSender = message.sender === myUsername;
  return isSender ? (
    <View style={styles.senderMessageContainer}>
      <Text style={styles.senderMessageText}>{message.text}</Text>
    </View>
  ) : (
    <View style={styles.receiverMessageContainer}>
      <Text style={styles.receiverMessageText}>{message.text}</Text>
    </View>
  );
}

export default function PrivateMessage({
  messages,
  loading,
  myUsername,
  myProfPicUrl,
  otherUsername,
  otherUserProfPicUrl,
  inputText,
  setInputText,
  inputRef,
  handleSendMessage
}) {
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <ScrollView>
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message.data}
            myUsername={myUsername}
            myProfPicUrl={myProfPicUrl}
            otherUsername={otherUsername}
            otherUserProfPicUrl={otherUserProfPicUrl}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          ref={inputRef}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
}

MessageItem.propTypes = {
  message: object,
  myUsername: string,
  myProfPicUrl: string,
  otherUsername: string,
  otherUserProfPicUrl: string
};

PrivateMessage.propTypes = {
  messages: array.isRequired,
  loading: bool.isRequired,
  myUsername: string,
  myProfPicUrl: string,
  otherUsername: string,
  otherUserProfPicUrl: string,
  inputText: string,
  setInputText: func.isRequired,
  inputRef: object,
  handleSendMessage: func.isRequired
};

/* eslint-disable react/prop-types */
import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import texts from '../../texts';

const searchUserstext = texts.SearchUsers;

export default function SearchUsers({
  userlist,
  handleSearchPress,
  searchTextField
}) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.formContainer} enabled>
        <Text style={styles.title}>{searchUserstext.searchUsersTitle}</Text>
        <View
          style={{
            flexDirection: 'column'
          }}
        >
          {searchTextField.map((field, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={i}>{field}</View>
          ))}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.5}
            onPress={handleSearchPress}
          >
            <Text style={styles.username}>
              {searchUserstext.submitButtonText}
            </Text>
          </TouchableOpacity>
        </View>
        {userlist.map((field, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <View style={styles.userList} key={i}>
            {field}
          </View>
        ))}
      </KeyboardAvoidingView>
    </View>
  );
}

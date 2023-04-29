import React from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { string, bool, func } from 'prop-types';

import texts from '../../texts';
import TextField from '../../components/Fields/TextField';

import { styles } from './styles';

const searchUserstext = texts.SearchUsers;

function Item({ title }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => console.log(title)}>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

function ItemSeparatorView() {
  return (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#000000'
      }}
    />
  );
}

export default function SearchUsers({ data, handleSearchPress, handleOnSearchChange }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.formContainer} enabled>
        <Text style={styles.title}>{searchUserstext.searchUsersTitle}</Text>
        <View style={{ flexDirection: 'column' }}>
          <TextField onChangeText={handleOnSearchChange} placeholder={texts.Fields.searchUsersPlaceholder} />
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSearchPress}>
            <Text style={styles.username}>{searchUserstext.submitButtonText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userList}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Item title={item} />}
            ItemSeparatorComponent={ItemSeparatorView}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

Item.propTypes = {
  title: string.isRequired
};

SearchUsers.propTypes = {
  data: bool,
  handleOnSearchChange: func,
  handleSearchPress: func
};

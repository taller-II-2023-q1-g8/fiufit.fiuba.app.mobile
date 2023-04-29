import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { func, shape } from 'prop-types';

import TextField from '../../components/Fields/TextField';
import { textFieldType } from '../../components/Fields/constants';
import texts from '../../texts';

import { styles } from './styles';
import SearchUsers from './layout';

// eslint-disable-next-line no-unused-vars
export default function SearchUsersScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  // eslint-disable-next-line no-shadow
  const fetchData = async (search) => {
    const response = await fetch(
      `https://api-gateway-k1nl.onrender.com/user/usernames?prefix=${search}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    );
    const json = await response.json();
    // eslint-disable-next-line no-console
    console.log(json.message);
    setData(json.message);
  };

  const handleSearchPress = async () => {
    fetchData(search);
  };

  // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types
  function Item({ title }) {
    return (
      // eslint-disable-next-line no-console
      <TouchableOpacity activeOpacity={0.8} onPress={() => console.log(title)}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  // eslint-disable-next-line react/no-unstable-nested-components
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
  const fields = [
    <FlatList
      data={data}
      renderItem={({ item }) => <Item title={item} />}
      // eslint-disable-next-line react/jsx-no-bind
      ItemSeparatorComponent={ItemSeparatorView}
    />
  ];

  // eslint-disable-next-line no-shadow
  const handleOnSearchChange = (search) => setSearch(search);

  const searchTextfield = [
    <TextField
      keyboardType={textFieldType}
      onChangeText={handleOnSearchChange}
      placeholder={texts.Fields.searchUsersPlaceholder}
    />
  ];

  return (
    <SearchUsers
      userlist={fields}
      searchTextField={searchTextfield}
      handleSearchPress={handleSearchPress}
    />
  );
}

SearchUsersScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

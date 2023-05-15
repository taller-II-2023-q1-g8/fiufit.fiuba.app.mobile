import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PropTypes, { string, bool, func } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import womanPic from '../../assets/woman.jpeg';
import texts from '../../texts';
import SearchField from '../../components/Fields/SearchField';
import { colors } from '../../colors';
import getProfilePicURL from '../../utils/profilePicURL';
import defaultProfPic from '../../assets/profile-pic-def.png';

import { styles } from './styles';

function Item({ handleItemPress, username }) {
  const [profPicUrl, setProfPicUrl] = useState(null);

  const fetchProfPicUrl = async (searchedUsername) => {
    const url = await getProfilePicURL(searchedUsername);
    setProfPicUrl(url);
  };

  useEffect(() => {
    fetchProfPicUrl(username);
  }, [username]);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(username)}>
      <View style={styles.item}>
        {profPicUrl !== null ? (
          <Image source={{ uri: profPicUrl }} style={styles.profilePic} />
        ) : (
          <Image source={defaultProfPic} style={styles.profilePic} />
        )}
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{username}</Text>
          <Text style={styles.profileType}>Trainee</Text>
        </View>
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
        opacity: 0.2,
        backgroundColor: colors.gray
      }}
    />
  );
}

export default function SearchUsers({ data, handleOnSearchChange, handleItemPress }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.formContainer} enabled>
        <SearchField onChangeText={handleOnSearchChange} placeholder={texts.Fields.searchUsersPlaceholder} />
        <FlatList
          data={data}
          renderItem={({ item }) => <Item handleItemPress={handleItemPress} username={item} />}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

Item.propTypes = {
  handleItemPress: func,
  username: string
};

SearchUsers.propTypes = {
  data: PropTypes.array.isRequired,
  handleItemPress: func,
  handleOnSearchChange: func
};

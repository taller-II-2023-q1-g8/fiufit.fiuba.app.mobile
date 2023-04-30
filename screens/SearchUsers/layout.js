import React from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { string, bool, func } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import womanPic from '../../assets/woman.jpeg';
import texts from '../../texts';
import SearchField from '../../components/Fields/SearchField';
import { colors } from '../../colors';

import { styles } from './styles';

function Item({ title }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => console.log(title)}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{title}</Text>
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

export default function SearchUsers({ data, handleOnSearchChange }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.formContainer} enabled>
        <SearchField onChangeText={handleOnSearchChange} placeholder={texts.Fields.searchUsersPlaceholder} />
        <FlatList
          data={data}
          renderItem={({ item }) => <Item title={item} />}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

Item.propTypes = {
  title: string.isRequired
};

SearchUsers.propTypes = {
  data: bool,
  handleOnSearchChange: func
};

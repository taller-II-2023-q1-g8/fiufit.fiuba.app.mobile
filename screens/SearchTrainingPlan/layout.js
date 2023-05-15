import React from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PropTypes, { string, func } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import texts from '../../texts';
import SearchField from '../../components/Fields/SearchField';
import GenericSelectField from '../../components/Fields/GenericSelectField';
import { colors } from '../../colors';

import { styles } from './styles';

function Item({ handleItemPress, username }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(username)}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{username}</Text>
          <Text style={styles.profileType}>Plan de Entrenamiento</Text>
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

const difficultyOptions = [
  { label: 'Cualquiera', value: 'ANY' },
  { label: 'Fácil', value: 'EASY' },
  { label: 'Intermedio', value: 'MEDIUM' },
  { label: 'Difícil', value: 'HARD' }
];

export default function SearchTrainingPlans({
  data,
  handleOnTitleChange,
  handleOnDifficultyChange,
  handleItemPress
}) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.formContainer} enabled>
        <SearchField
          onChangeText={handleOnTitleChange}
          placeholder={texts.Fields.searchTrainingPlansPlaceholder}
        />
        <GenericSelectField
          title="Dificultad"
          items={difficultyOptions}
          onChangeText={handleOnDifficultyChange}
        />
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

SearchTrainingPlans.propTypes = {
  data: PropTypes.array.isRequired,
  handleItemPress: func,
  handleOnTitleChange: func,
  handleOnDifficultyChange: func
};

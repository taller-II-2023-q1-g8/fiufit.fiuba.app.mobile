import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from 'react-native';
import { string, bool, func, array } from 'prop-types';

import texts from '../../texts';
import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import Loader from '../../components/Loader';

import { scrollviewStyle, styles } from './styles';

const trainerHomeTexts = texts.TrainerHome;

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
export default function TrainerHome({ username, handleTrainerHome, data, handleItemPress, loading }) {
  console.log(data);
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <View style={styles.container}>
          <StatusBar />
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            <Text style={styles.title}>{trainerHomeTexts.homeTitle}</Text>
            <Text>Welcome to trainer home {username}!</Text>
            <Text>Your training plans: </Text>
            <FlatList
              data={data}
              renderItem={({ item }) => <Item handleItemPress={handleItemPress} username={item.title} />}
              ItemSeparatorComponent={ItemSeparatorView}
            />
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleTrainerHome}>
              <Text style={styles.submitButtonText}>Ir a home de atleta</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
}
Item.propTypes = {
  handleItemPress: func,
  username: string
};

TrainerHome.propTypes = {
  username: string.isRequired,
  handleTrainerHome: func.isRequired,
  data: array.isRequired,
  handleItemPress: func.isRequired,
  loading: bool.isRequired
};

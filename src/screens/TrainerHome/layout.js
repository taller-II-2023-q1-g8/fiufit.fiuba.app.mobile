import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { string, bool, func, array, object } from 'prop-types';

import texts from '../../texts';
import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import Loader from '../../components/Loader';

import { styles } from './styles';

const trainerHomeTexts = texts.TrainerHome;

function Item({ handleItemPress, username, itemData }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(itemData)}>
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
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <View style={styles.container}>
          <StatusBar />
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            <Text style={styles.title}>{trainerHomeTexts.homeTitle}</Text>
            <Text>Bienvenido al inicio de entrenadores, {username}!</Text>
            <Text>Tus planes:</Text>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Item handleItemPress={handleItemPress} username={item.title} itemData={item} />
              )}
              ItemSeparatorComponent={ItemSeparatorView}
            />
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleTrainerHome}>
              <Text style={styles.submitButtonText}>Ir a inicio de atleta</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
}
Item.propTypes = {
  handleItemPress: func,
  username: string,
  itemData: object
};

TrainerHome.propTypes = {
  username: string.isRequired,
  handleTrainerHome: func.isRequired,
  data: array.isRequired,
  handleItemPress: func.isRequired,
  loading: bool.isRequired
};

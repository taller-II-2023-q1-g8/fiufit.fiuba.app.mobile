import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Modal,
  Pressable,
  TextInput
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { array, func, object } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import texts from '../../texts';
import SearchField from '../../components/Fields/SearchField';
import { colors } from '../../colors';

import { styles } from './styles';

function ItemAthlete({ handleItemPress, athlete }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(athlete)}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={styles.username}>Atleta: {athlete.username}</Text>
          <Text style={styles.quantity_cal}>Nota: {athlete.calification_score}</Text>
          <Text style={styles.quality_cal}>Calificacion: {athlete.calification}</Text>
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

export default function PlanStats({ plan, handleAthletePress }) {
  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={manPic} />
      <View style={{ borderColor: 'black', borderWidth: 1, flex: 0.15 }}>
        <Text style={{ ...styles.title, textAlign: 'center' }}>{plan.title}</Text>
      </View>
      <View style={{ borderColor: 'black', borderWidth: 1, flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            borderColor: 'black',
            borderWidth: 1,
            flex: 0.15,
            justifyContent: 'center'
          }}
        >
          <View style={{ borderColor: 'black', borderWidth: 1, flex: 1 }}>
            <Text style={{ color: colors.gray, textAlign: 'center' }}>Likes</Text>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{plan.likes}</Text>
          </View>
          <View style={{ borderColor: 'black', borderWidth: 1, flex: 1 }}>
            <Text style={{ color: colors.gray, textAlign: 'center' }}>Calificacion promedio</Text>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{plan.average_calification}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={plan.athletes_that_favorited}
            renderItem={({ item }) => <ItemAthlete handleItemPress={handleAthletePress} athlete={item} />}
            ItemSeparatorComponent={ItemSeparatorView}
          />
        </View>
      </View>
    </View>
  );
}

ItemAthlete.propTypes = {
  handleItemPress: func,
  athlete: object
};

PlanStats.propTypes = {
  plan: object.isRequired,
  handleAthletePress: func
};

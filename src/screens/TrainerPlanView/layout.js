import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { array, bool, func, object } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import Loader from '../../components/Loader';

import { styles } from './styles';

function Item({ handleItemPress, athlete }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(athlete)}>
      <View style={styles.item}>
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

export default function TrainerPlanView({ data, loading, handleAthletePress }) {
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.profilePicture} source={manPic} />
            <View>
              <Text style={styles.title}>{data.title}</Text>
              <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                <View style={{ marginRight: 30 }}>
                  <Text style={{ color: colors.gray }}>Tags</Text>
                  <Text style={{ fontWeight: 'bold' }}>{data.tags}</Text>
                  <Text style={{ color: colors.gray }}>Dificultad</Text>
                  <Text style={{ fontWeight: 'bold' }}>{data.difficulty}</Text>
                  <Text style={{ color: colors.gray }}>Descripcion</Text>
                  <Text style={{ width: '80%' }}>{data.description}</Text>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image style={{ width: 20, height: 20 }} source={TrainerIcon} /> */}
              </View>
            </View>
          </View>
          <Text style={styles.title}>Estadisticas</Text>
          <Text>Cantidad de likes: {data.likes}</Text>
          <Text>Calificacion promedio: {data.average_calification}</Text>
          <View style={styles.container}>
            <FlatList
              data={data.athletes_that_favorited}
              renderItem={({ item }) => <Item handleItemPress={handleAthletePress} athlete={item} />}
              ItemSeparatorComponent={ItemSeparatorView}
            />
          </View>
        </View>
      )}
    </>
  );
}

TrainerPlanView.propTypes = {
  data: object,
  loading: bool,
  handleAthletePress: func
};

Item.propTypes = {
  handleItemPress: func,
  athlete: object
};

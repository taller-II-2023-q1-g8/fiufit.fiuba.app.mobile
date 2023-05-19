import { Text, View, Image } from 'react-native';
import React from 'react';
import { bool, object, string } from 'prop-types';

import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';

import { styles } from './styles';

export default function SearchedProfile({ data, profPicUrl, loading }) {
  return Object.keys(data).length !== 0 ? (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.header}>
        {profPicUrl !== null ? (
          <Image source={{ uri: profPicUrl }} style={styles.profilePicture} />
        ) : (
          <Image source={defaultProfPic} style={styles.profilePicture} />
        )}
        <View>
          <Text style={styles.username}>{data.firstname + (data.lastname || '')}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ marginRight: 30 }}>
              <Text style={{ fontWeight: 'bold' }}>100</Text>
              <Text style={{ color: colors.gray }}>followers</Text>
            </View>
            <View>
              <Text style={{ fontWeight: 'bold' }}>200</Text>
              <Text style={{ color: colors.gray }}>following</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 20, height: 20 }} source={TrainerIcon} />
            <Text>Trainee</Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Estadísticas</Text>
      <Text>...</Text>
      <Text style={styles.title}>Training</Text>
      <Text>...</Text>
      <Text style={styles.title}>Photos</Text>
      <Text>...</Text>
    </View>
  ) : (
    <Loader loading={data.length === 0} />
  );
}

SearchedProfile.propTypes = {
  data: object,
  profPicUrl: string,
  loading: bool
};

import { bool, func, string } from 'prop-types';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import manPic from '../../assets/man.jpeg';
import MoreOptionsIcon from '../../assets/more-options.png';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';

import { styles } from './styles';

export default function UserProfile({ data, handleEditProfile, profPicUrl, loading }) {
  return Object.keys(data).length !== 0 ? (
    <View style={styles.container}>
      <Loader loading={loading} />
      <TouchableOpacity activeOpacity={0.1} onPress={handleEditProfile}>
        <Image
          style={{ width: 30, height: 30, opacity: 0.5, display: 'flex', alignSelf: 'flex-end' }}
          source={MoreOptionsIcon}
        />
      </TouchableOpacity>
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
            <Text>Trainer</Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Stats</Text>
      <Text>...</Text>
      <Text style={styles.title}>Training</Text>
      <Text>...</Text>
      <Text style={styles.title}>Photos</Text>
      <Text>...</Text>
      {/* {Object.keys(data).map((key) => {
        const value = data[key];
        return (
          <>
            <Text>{key}</Text>
            <Text>{!!value && value.length > 0 ? value : 'No hay datos'}</Text>;
          </>
        );
      })} */}
    </View>
  ) : (
    <Loader loading={data.length === 0} />
  );
}

UserProfile.propTypes = {
  data: bool,
  handleEditProfile: func,
  profPicUrl: string,
  loading: bool
};

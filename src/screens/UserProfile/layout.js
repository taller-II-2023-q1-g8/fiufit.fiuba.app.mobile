import { bool, func, object, string } from 'prop-types';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import MoreOptionsIcon from '../../assets/more-options.png';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';

import { styles } from './styles';

export default function UserProfile({ data, handleEditProfile, profPicUrl, loading, handleAddStat }) {
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
              <Text style={{ color: colors.gray }}>followers</Text>
              <Text style={{ fontWeight: 'bold' }}>{data.followers}</Text>
            </View>
            <View>
              <Text style={{ color: colors.gray }}>following</Text>
              <Text style={{ fontWeight: 'bold' }}>{data.followed}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 20, height: 20, marginRight: 2 }} source={TrainerIcon} />
            <Text>Athlete</Text>
          </View>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={styles.title}>Metas</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={handleAddStat}>
          <Text
            style={{
              ...styles.title,
              ...{
                color: 'red',
                marginHorizontal: 10,
                paddingHorizontal: 10,
                borderColor: 'red',
                borderWidth: 0.5,
                borderRadius: 50,
                fontWeight: '400'
              }
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
      <Text>...</Text>
      <Text style={styles.title}>Entrenamientos</Text>
      <Text>...</Text>
      <Text style={styles.title}>Fotos</Text>
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
  data: object,
  handleAddStat: func,
  handleEditProfile: func,
  profPicUrl: string,
  loading: bool
};

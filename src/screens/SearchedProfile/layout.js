import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { bool, object, string, func } from 'prop-types';

import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';
import BackgroundImage from '../../assets/Background.jpg';

import { styles } from './styles';

export default function SearchedProfile({
  data,
  profPicUrl,
  loading,
  handleFollowPress,
  handleUnfollowPress,
  following
}) {
  return Object.keys(data).length !== 0 ? (
    <ImageBackground source={BackgroundImage}>
      <View style={styles.container}>
        <Loader loading={loading} />
        <View style={styles.header}>
          {profPicUrl !== null ? (
            <Image source={{ uri: profPicUrl }} style={styles.profilePicture} />
          ) : (
            <Image source={defaultProfPic} style={styles.profilePicture} />
          )}
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                minWidth: '65%',
                maxWidth: '80%',
                alignContent: 'flex-start'
              }}
            >
              <Text style={styles.username}>{`${data.firstname} ${data.lastname || ''}`}</Text>
              {following ? (
                <TouchableOpacity
                  style={styles.unfollowButton}
                  activeOpacity={0.5}
                  onPress={handleUnfollowPress}
                >
                  <Text style={styles.unfollowText}>Dejar de seguir</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.followButton} activeOpacity={0.5} onPress={handleFollowPress}>
                  <Text style={styles.followText}>Seguir</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, marginTop: 3 }}>
              <View style={{ marginRight: 30 }}>
                <Text style={{ fontWeight: 'bold', color: colors.main }}>{data.followers}</Text>
                <Text style={{ color: colors.main }}>followers</Text>
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', color: colors.main }}>{data.followed}</Text>
                <Text style={{ color: colors.main }}>following</Text>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ width: 20, height: 20, tintColor: colors.white }} source={TrainerIcon} />
              <Text style={{ color: colors.white }}>{data.role}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.title}>Estadísticas</Text>
        <Text style={{ color: colors.white }}>...</Text>
        <Text style={styles.title}>Training</Text>
        <Text style={{ color: colors.white }}>...</Text>
        <Text style={styles.title}>Photos</Text>
        <Text style={{ color: colors.white }}>...</Text>
      </View>
    </ImageBackground>
  ) : (
    <Loader loading={data.length === 0} />
  );
}

SearchedProfile.propTypes = {
  data: object,
  profPicUrl: string,
  loading: bool,
  handleFollowPress: func,
  handleUnfollowPress: func,
  following: bool
};

import { bool, func, object, string } from 'prop-types';
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Edit from '../../assets/icons/edit.png';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';
import BackgroundImage from '../../assets/Background.jpg';
import manPic from '../../assets/man.jpeg';

import { styles } from './styles';
import { getPlanPicURL } from '../../utils';
import { scrollviewStyle } from '../Home/styles';

function Item({ handleItemPress, itemData }) {
  const [planPicUrl, setPlanPicUrl] = useState(null);
  const fetchPlanPicUrl = async () => {
    const url = await getPlanPicURL(itemData.id);
    setPlanPicUrl(url);
  };

  useEffect(() => {
    fetchPlanPicUrl();
  }, []);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(itemData)}>
      <View style={styles.item}>
        {planPicUrl !== null ? (
          <Image source={{ uri: planPicUrl }} style={styles.profilePic} />
        ) : (
          <Image source={manPic} style={styles.profilePic} />
        )}
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{itemData.title}</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Ionicons
              name="heart"
              style={{ width: 30, height: 30, tintColor: colors.white, paddingLeft: 10 }}
              size={20}
              color={colors.error}
            />
            <Text style={{ color: colors.white, fontSize: 15, paddingLeft: 10 }}>{itemData.likes}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Ionicons
              name="star"
              style={{ width: 30, height: 30, tintColor: colors.white, paddingLeft: 10 }}
              size={20}
              color="#ffb300"
            />
            <Text style={{ color: colors.white, fontSize: 15, paddingLeft: 10 }}>
              {itemData.average_calification} / 10
            </Text>
          </View>
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

export default function TrainerProfile({
  data,
  handleEditProfile,
  profPicUrl,
  loading,
  handleAddStat,
  handlePlanPress,
  handleSignOutPress,
  handleTrainerHome
}) {
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Loader loading={loading} />

        {loading ? null : (
          <ScrollView contentContainerStyle={scrollviewStyle}>
            <View style={styles.header}>
              <View style={styles.headerInfo}>
                {profPicUrl !== null ? (
                  <Image source={{ uri: profPicUrl }} style={styles.profilePicture} />
                ) : (
                  <Image source={defaultProfPic} style={styles.profilePicture} />
                )}
                <View>
                  {data.firstname === undefined || data.lastname === undefined ? null : (
                    <Text style={styles.username}>{data.firstname + (data.lastname || '')}</Text>
                  )}
                  <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                    <View style={{ marginRight: 30 }}>
                      <Text style={{ fontWeight: 'bold', color: colors.main }}>{data.followers}</Text>
                      <Text style={{ color: colors.main }}>Seguidores</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: 'bold', color: colors.main }}>{data.followed}</Text>
                      <Text style={{ color: colors.main }}>Seguidos</Text>
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      style={{ width: 20, height: 20, marginRight: 2, tintColor: colors.white }}
                      source={TrainerIcon}
                    />
                    <Text style={{ color: colors.white }}>Entrenador</Text>
                  </View>
                </View>
              </View>
              <View style={styles.headerIcons}>
                <TouchableOpacity
                  activeOpacity={0.1}
                  style={{ alignSelf: 'flex-start', marginLeft: 30 }}
                  onPress={handleEditProfile}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: colors.white,
                      display: 'flex',
                      alignSelf: 'flex-end'
                    }}
                    source={Edit}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.1}
                  style={{ alignSelf: 'flex-start', marginLeft: 26 }}
                  onPress={handleTrainerHome}
                >
                  <Ionicons name="md-swap-horizontal-outline" size={40} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.1}
                  style={{ alignSelf: 'flex-start', marginLeft: 29 }}
                  onPress={handleSignOutPress}
                >
                  <Ionicons name="md-log-out-outline" size={40} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.title}>Estadísticas</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Ionicons
                name="heart"
                style={{ width: 30, height: 30, tintColor: colors.white }}
                size={30}
                color={colors.error}
              />
              <Text style={{ color: colors.white, fontSize: 25, paddingLeft: 10 }}>{data.likesTotales}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Ionicons
                name="star"
                style={{ width: 30, height: 30, tintColor: colors.white }}
                size={30}
                color="#ffb300"
              />
              <Text style={{ color: colors.white, fontSize: 25, paddingLeft: 10 }}>
                {data.averageCalification} / 10
              </Text>
            </View>
            <Text style={styles.title}>Plan mas likeado</Text>
            <Item handleItemPress={handlePlanPress} itemData={data.mostLikedPlan} />
            <Text style={styles.title}>Plan mejor calificado</Text>
            <Item handleItemPress={handlePlanPress} itemData={data.bestCalificationPlan} />
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
}

Item.propTypes = {
  handleItemPress: func,
  itemData: object
};

TrainerProfile.propTypes = {
  data: object,
  handleAddStat: func,
  handleEditProfile: func,
  handlePlanPress: func,
  profPicUrl: string,
  loading: bool,
  handleSignOutPress: func,
  handleTrainerHome: func
};

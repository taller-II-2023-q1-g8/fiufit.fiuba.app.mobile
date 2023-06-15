import { bool, func, object, string } from 'prop-types';
import { Text, View, Image, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Edit from '../../assets/icons/edit.png';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';
import BackgroundImage from '../../assets/Background.jpg';
import manPic from '../../assets/man.jpeg';

import { styles } from './styles';

function Item({ handleItemPress, itemData }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(itemData)}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={{ fontSize: 17, fontWeight: '600', paddingLeft: 10, color: 'white' }}>
            {itemData.title}
          </Text>
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
  handleSignOutPress
}) {
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Loader loading={loading} />

        {loading ? null : (
          <>
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
                  style={{ alignSelf: 'flex-start', marginLeft: 30 }}
                  onPress={handleSignOutPress}
                >
                  <Ionicons name="md-log-out-outline" size={40} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.title}>Métricas</Text>
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
            <Text style={{ color: colors.white }}>...</Text>
            <View>
              <Text style={styles.title}>Entrenamientos favoritos</Text>
              <FlatList
                key={data.plans}
                data={data.plans}
                renderItem={({ item }) => <Item handleItemPress={handlePlanPress} itemData={item} />}
                ItemSeparatorComponent={ItemSeparatorView}
              />
            </View>
          </>
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
  handleSignOutPress: func
};

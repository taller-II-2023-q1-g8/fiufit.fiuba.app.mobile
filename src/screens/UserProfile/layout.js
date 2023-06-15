import { bool, func, object, string } from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native';
import React from 'react';
import { ContributionGraph, LineChart } from 'react-native-chart-kit';

import Edit from '../../assets/icons/edit.png';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';
import BackgroundImage from '../../assets/Background.jpg';
import manPic from '../../assets/man.jpeg';

import { styles } from './styles';

const screenWidth = Dimensions.get('window').width;
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

export default function UserProfile({
  data,
  handleEditProfile,
  profPicUrl,
  loading,
  handleAddStat,
  handlePlanPress
}) {
  const chartConfig = {
    backgroundGradientFrom: '#01092f',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#01092f',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 175, 26, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <ScrollView style={styles.container}>
        <Loader loading={loading} />

        {loading ? null : (
          <>
            <View style={styles.header}>
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
                    <Text style={{ color: colors.main }}>followers</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: 'bold', color: colors.main }}>{data.followed}</Text>
                    <Text style={{ color: colors.main }}>following</Text>
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ width: 20, height: 20, marginRight: 2, tintColor: colors.white }}
                    source={TrainerIcon}
                  />
                  <Text style={{ color: colors.white }}>Athlete</Text>
                </View>
              </View>
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
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.title}>Metas</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={handleAddStat}>
                <Text
                  style={{
                    ...styles.title,
                    ...{
                      color: colors.main_soft,
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderColor: colors.main_soft,
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
            <LineChart data={data.dataChart} width={screenWidth} height={220} chartConfig={chartConfig} />
            <Text style={styles.titleFavs}>Entrenamientos favoritos</Text>
            {data.plans !== undefined
              ? data.plans.map((plan) => (
                  <>
                    <Item handleItemPress={handlePlanPress} itemData={plan} />
                    <ItemSeparatorView />
                  </>
                ))
              : null}
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

Item.propTypes = {
  handleItemPress: func,
  itemData: object
};

UserProfile.propTypes = {
  data: object,
  handleAddStat: func,
  handleEditProfile: func,
  handlePlanPress: func,
  profPicUrl: string,
  loading: bool
};

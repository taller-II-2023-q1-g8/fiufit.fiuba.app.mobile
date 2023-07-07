import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import defaultProfPic from '../../../../../assets/profile-pic-def.png';
import returnArrow from '../../../../../assets/go-back-arrow.png';
import returnArrowWhite from '../../../../../assets/go-back-arrow-white.png';

import { styles } from './styles';

export const MPHeader = ({ navigation, route }) => {
  const { otherUsername, otherUserProfPicUrl } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return {
    title: otherUsername,
    headerTitleStyle: {
      marginLeft: 100
    },
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={returnArrowWhite} style={styles.backArrow} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoBack}>
          {otherUserProfPicUrl !== null ? (
            <Image source={{ uri: otherUserProfPicUrl }} style={styles.profilePic} />
          ) : (
            <Image source={defaultProfPic} style={styles.profilePic} />
          )}
        </TouchableOpacity>
      </View>
    )
  };
};

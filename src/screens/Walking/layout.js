import { ImageBackground, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import BackgroundImage from '../../assets/Background.jpg';

import { styles } from './styles';

export default function Walking() {
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Text>WalkingScreenContainer</Text>
      </View>
    </ImageBackground>
  );
}

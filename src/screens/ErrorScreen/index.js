import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { bool } from 'prop-types';

import BackgroundImage from '../../assets/Background.jpg';
import { colors } from '../../colors';

export default function ErrorView({ err }) {
  return err ? (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            item: {
              display: 'flex',
              flexDirection: 'row',
              paddingVertical: 10,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: 'lightgray',
              backgroundColor: colors.feed_items,
              paddingLeft: 10
            }
          }}
        >
          <Text style={{ color: 'white', fontSize: 25 }}>
            {' '}
            Servicios bloqueados intente nuevamente más tarde{' '}
          </Text>
        </View>
      </View>
    </ImageBackground>
  ) : null;
}
ErrorView.propTypes = {
  err: bool
};

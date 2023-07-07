/* eslint-disable no-console */
/* eslint-disable no-undef */
import 'expo-dev-client';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import messaging, { firebaseMessaging } from '@react-native-firebase/messaging';
import { Alert, Share } from 'react-native';

import './firebaseConfig';
import { StateProvider } from './src/state';
import RootNavigation from './src/navigation';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    console.info('Reactotron Configured');
  });
}

const shareMessage = async (message) => {
  try {
    await Share.share({
      message: `Completé una meta en FiuFit: ${message.split(':')[1]}!`
    });
  } catch (error) {
    console.log('Error al compartir:', error);
  }
};

async function onMessageReceived(message) {
  if (!message.notification.title.startsWith('Mensaje de')) {
    console.log({ message });
    console.log('NOTIFICATION RECEIVED:', message.title);
    Alert.alert('Meta completada!', message.notification.body, [
      {
        text: 'Compartir',
        onPress: () => shareMessage(message.notification.body)
      },
      {
        text: 'Ok'
      }
    ]);
  }
}

export default function App() {
  messaging().onMessage(onMessageReceived);
  return (
    <StateProvider hidden>
      <StatusBar hidden />
      <RootNavigation />
    </StateProvider>
  );
}

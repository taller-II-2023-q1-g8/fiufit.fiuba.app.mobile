/* eslint-disable no-console */
/* eslint-disable no-undef */
import 'expo-dev-client';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import messaging, { firebaseMessaging } from '@react-native-firebase/messaging';

import './firebaseConfig';
import { StateProvider } from './src/state';
import RootNavigation from './src/navigation';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    console.info('Reactotron Configured');
  });
}

async function onMessageReceived(message) {
  if (!message.notification.title.startsWith('Mensaje de')) {
    console.log('NOTIFICATION RECEIVED:', message.title);
    alert(message.notification.body);
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

/* eslint-disable no-console */
/* eslint-disable no-undef */
import 'expo-dev-client';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import './firebaseConfig';
import { StateProvider } from './src/state';
import RootNavigation from './src/navigation';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    console.info('Reactotron Configured');
  });
}

export default function App() {
  return (
    <StateProvider hidden>
      <StatusBar hidden />
      <RootNavigation />
    </StateProvider>
  );
}

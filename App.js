import React from 'react';
import 'expo-dev-client';

import './firebaseConfig';
import RootNavigation from './src/navigation';
import { StateProvider } from './src/state';

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    console.log('Reactotron Configured');
  });
}

export default function App() {
  return (
    <StateProvider>
      <RootNavigation />
    </StateProvider>
  );
}

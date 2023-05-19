import React from 'react';
import 'expo-dev-client';

import './firebaseConfig';
import RootNavigation from './src/navigation';

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    console.log('Reactotron Configured');
  });
}

export default function App() {
  return <RootNavigation />;
}

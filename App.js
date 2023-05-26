import React from 'react';
import 'expo-dev-client';

import './firebaseConfig';
import RootNavigation from './src/navigation';
import { StateProvider } from './src/state';

export default function App() {
  return (
    <StateProvider>
      <RootNavigation />
    </StateProvider>
  );
}

import React from 'react';
import 'expo-dev-client';

import './firebaseConfig';
import RootNavigation from './src/navigation';

// console.disableYellowBox = true;

export default function App() {
  return <RootNavigation />;
}

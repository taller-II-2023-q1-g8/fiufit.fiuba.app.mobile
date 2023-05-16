import React from 'react';
import 'expo-dev-client';

import RootNavigation from './navigation';
import './firebaseConfig';

// console.disableYellowBox = true;

export default function App() {
  return <RootNavigation />;
}

import React from 'react';
import 'expo-dev-client';

import './firebaseConfig';
import RootNavigation from './src/navigation';
import { StateProvider } from './src/utils/state/state';

export default function App() {
  const stateData = {
    user: '',
    athleteScreen: true,
    plansData: [],
    userGoals: '',
    automaticallyLogged: true
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeUser':
        return {
          ...state,
          user: action.newUser
        };
      case 'changeCurrentStack':
        return {
          ...state,
          athleteScreen: action.newScreen
        };
      case 'addPlansData':
        return {
          ...state,
          plansData: action.plansData
        };
      case 'addNewGoal':
        return {
          ...state,
          userGoals: action.userGoals
        };
      case 'setUserData':
        return {
          ...state,
          user: action.user,
          userGoals: action.userGoals
        };
      case 'logIn':
        return {
          ...state,
          automaticallyLogged: action.automaticallyLogged
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={stateData} reducer={reducer}>
      <RootNavigation />
    </StateProvider>
  );
}

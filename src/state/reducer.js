import { cloneDeep } from 'lodash';

import { initialState } from './initialData';

const updatesValuesActionTypes = ['changeCurrentStack', 'logIn', 'setUserData']; // updateFollowedUsers

const shouldUpdateValues = (type) => updatesValuesActionTypes.includes(type);

const getNewValues = (action) => {
  const newValues = cloneDeep(action);
  delete newValues.type;
  return newValues;
};

/* Actualmente, en el reducer solamente se están cambiando valores, no hay ninguna lógica,
 * por eso no hay un switch (todos los casos hacen exactamente lo mismo). En un futuro, si
 * se agrega lógica, se volvería al switch. */
export const reducer = (state, action) => {
  if (shouldUpdateValues(action.type)) return { ...state, ...getNewValues(action) };
  switch (action.type) {
    case 'addNewGoal': {
      return { ...state, userGoals: [...state.userGoals, action.newGoal] };
    }
    case 'addPlansData': {
      return { ...state, plansData: [...state.plansData, action.newPlansData] };
    }
    // Este caso se podría eliminar, agregando este action.type en updatesValuesActionTypes
    case 'updateFollowedUsers': {
      return { ...state, followedUsers: action.followedUsers };
    }
    case 'resetValues': {
      return initialState;
    }
    default:
      return state;
  }
};

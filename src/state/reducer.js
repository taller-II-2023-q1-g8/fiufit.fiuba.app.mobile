import { cloneDeep } from 'lodash';

const updatesValuesActionTypes = ['addNewGoal', 'addPlansData', 'changeCurrentStack', 'logIn', 'setUserData'];

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
  return state;
};

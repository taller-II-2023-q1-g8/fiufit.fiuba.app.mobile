import { any } from 'prop-types';
import React, { createContext, useContext, useReducer } from 'react';

import { reducer } from './reducer';
import { initialState } from './initialData';

export const StateContext = createContext();
export function StateProvider({ children }) {
  return <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>;
}

StateProvider.propTypes = {
  children: any.isRequired
};

export const useStateValue = () => useContext(StateContext);

import { any } from 'prop-types';
import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();
export function StateProvider({ reducer, initialState, children }) {
  return <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>;
}

StateProvider.propTypes = {
  reducer: any.isRequired,
  initialState: any.isRequired,
  children: any.isRequired
};

export const useStateValue = () => useContext(StateContext);

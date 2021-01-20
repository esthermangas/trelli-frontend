import React, { createContext, useContext } from 'react';
import { useBoardReducer } from './reducer';
import boardActions from './types';

const BoardContext = createContext();

export const BoardContextProvider = ({ children }) => {
  const [state, dispatch] = useBoardReducer();
  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const { state, dispatch } = useContext(BoardContext);

  return {
    state,
    dispatch,
  };
};

import React from 'react';
import Board from './board.view';
import { BoardContextProvider } from '../../context/boardContext';

const Index = () => (
  <BoardContextProvider>
    <Board />
  </BoardContextProvider>
);
export default Index;

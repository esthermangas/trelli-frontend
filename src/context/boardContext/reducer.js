import { useReducer } from 'react';
import boardActions from './types';
import { updateListOrder } from './service';

const initialState = {
  board: {},
  refresh: true,
  modal: false,
  card: {},
};

const sortItems = (item1, item2) => {
  if (item1.order < item2.order) {
    return -1;
  }
  if (item1.order > item2.order) {
    return 1;
  }
  return 0;
};

const boardReducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case boardActions.BOARD__SET_BOARD:
      // eslint-disable-next-line no-param-reassign
      action.payload.board.lists.sort(sortItems);
      action.payload.board.lists = action.payload.board.lists.map((list) => {
        list.cards.sort(sortItems);
        return list;
      });
      newState.board = action.payload.board;
      return newState;
    case boardActions.BOARD__SET_REFRESH:
      newState.refresh = action.payload.refresh;
      return newState;
    case boardActions.BOARD__LOAD_BOARD:
      action.payload.board.lists.sort(sortItems);
      action.payload.board.lists = action.payload.board.lists.map((list) => {
        list.cards.sort(sortItems);
        return list;
      });
      newState.board = action.payload.board;
      newState.refresh = false;
      return newState;
    case boardActions.BOARD__UPDATE_LIST_ORDER:
      newState.board = updateListOrder(
        state.board,
        action.payload.newOrder,
        action.payload.originId,
      );
      newState.refresh = false;
      return newState;
    case boardActions.BOARD__OPEN_MODAL_WITH_CARD:
      newState.card = action.payload.card;
      newState.modal = true;
      return newState;
    case boardActions.BOARD__CLOSE_MODAL:
      newState.modal = false;
      return newState;
    default:
      return state;
  }
};

export const useBoardReducer = () => useReducer(boardReducer, initialState);

export const updateListOrder = (board, newOrder, originId) => {
  const newBoard = { ...board };
  const list = newBoard.lists.filter((l) => l._id === originId)[0];
  const maxOrder = list.order > newOrder ? list.order : newOrder;
  const minOrder = list.order < newOrder ? list.order : newOrder;
  const isAscendent = list.order !== maxOrder;
  for (let i = 0; i < newBoard.lists.length; i++) {
    if (
      newBoard.lists[i].order >= minOrder
      && newBoard.lists[i].order <= maxOrder
    ) {
      if (list._id === newBoard.lists[i]._id) {
        newBoard.lists[i].order = newOrder;
      } else if (isAscendent) {
        newBoard.lists[i].order -= 1;
      } else {
        newBoard.lists[i].order += 1;
      }
    }
  }

  return newBoard;
};

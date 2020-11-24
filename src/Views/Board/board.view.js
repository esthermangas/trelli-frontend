import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Icon, Text, TextField } from 'esther-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useBoardContext } from '../../context/boardContext';
import boardActions from '../../context/boardContext/types';
import styles from './board.module.css';
import Api from '../../api';
import List from '../../Components/list';
import { useComponentVisible } from '../../hooks';
import CardModal from '../../Components/cardModal';

const Board = () => {
  const { state, dispatch } = useBoardContext();
  const [errorBoard, setErrorBoard] = useState({});
  const [errorList, setErrorList] = useState({});
  const [data, setData] = useState({ name: '' });
  const {
    ref: refInput,
    isComponentVisible: inputVisible,
    setIsComponentVisible: setInputVisible,
  } = useComponentVisible();
  const history = useHistory();
  const handleClick = () => {
    history.push('/app');
  };
  const { id } = useParams();
  useEffect(() => {
    if (state.refresh) {
      Api.fetchResource('GET', 'board', {}, {}, {}, id)
        .then((res) => {
          dispatch({
            type: boardActions.BOARD__LOAD_BOARD,
            payload: { board: res },
          });
        })
        .catch((apiError) => {
          const errBoard = apiError.response;
          setErrorBoard(errBoard);
        });
    }
  }, [state.refresh]);

  const sendNewList = () => {
    Api.fetchResource('POST', `board/${state.board._id}/list`, { body: data })
      .then((res) => {
        setData({ name: '' });
        setInputVisible(false);
        dispatch({
          type: boardActions.BOARD__SET_REFRESH,
          payload: { refresh: true },
        });
      })
      .catch((apiError) => {
        const errList = apiError.response.error;
        setErrorList(errList);
      });
  };

  const showInput = () => {
    setInputVisible(true);
  };
  const hideInput = () => {
    setInputVisible(false);
    setErrorList({ name: '' });
    setData({ name: '' });
  };
  const handleChange = (e) => {
    setData({ name: e.target.value });
    if (e.target.value === '') {
      setErrorList({ name: '' });
    }
  };
  const onDragEnd = (result) => {
    debugger;
    dispatch({
      type: boardActions.BOARD__UPDATE_LIST_ORDER,
      payload: {
        newOrder: result.destination.index,
        originId: result.draggableId,
      },
    });
    /* Api.fetchResource('PATCH', `board/${id}/list/${result.draggableId._id}`, {
      body: {
        order: result.destination.index,
      },
    }); */
  };
  return (
    <div className={styles.root}>
      <CardModal />
      <div className={styles.appBar}>
        <div className={styles.button}>
          <Button
            label="Back to"
            iconRight="home"
            color="white"
            variant="text"
            size="big"
            onClick={handleClick}
          />
        </div>
        <div className={styles.title}>
          <Text color="white" tagHtml="h2" display="center">
            {state.board.name}
          </Text>
        </div>
      </div>
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="listDroppable" direction="horizontal">
            {(provided) => (
              <div
                className={styles.lists}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {state.board.lists
                  && state.board.lists.map((list) => (
                    <Draggable
                      key={list._id}
                      draggableId={list._id}
                      index={list.order}
                    >
                      {(provided) => (
                        <div
                          className={styles.item}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <List list={list} boardLists={state.board.lists} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <div className={styles.finalItem} ref={refInput}>
                  {inputVisible && (
                    <div className={styles.text}>
                      <TextField
                        label="Name"
                        onChange={handleChange}
                        value={data.name}
                        color="white"
                        fullWidth
                        infoMessage={errorList.name}
                        error={errorList.name}
                      />
                      <div>
                        <span className={styles.spanClose} onClick={hideInput}>
                          <Icon name="cross" color="white" size="36" />
                        </span>
                      </div>
                    </div>
                  )}
                  <div className={styles.sendContainer}>
                    {!inputVisible && (
                      <Button
                        iconLeft="addCircle"
                        label="Add another list"
                        variant="text"
                        color="white"
                        onClick={showInput}
                        fullWidth
                      />
                    )}
                    {inputVisible && data.name.length > 0 && (
                      <div className={styles.sendIcon} onClick={sendNewList}>
                        <span>
                          <Icon name="send" color="sky" size="36" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;

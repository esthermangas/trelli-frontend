import React, { useEffect, useState } from 'react';
import { Icon, Text, Button, Select, Item } from 'esther-components';
import { useBoardContext } from '../../context/boardContext';
import styles from './cardModalContent.module.css';
import useComponentVisible from '../../hooks/useComponentVisible';
import Api from '../../api';
import boardActions from '../../context/boardContext/types';

const CardModalContent = () => {
  const { state, dispatch } = useBoardContext();
  const [data, setData] = useState({
    title: state.card.title,
    description: state.card.description,
  });
  const handleChangeTitle = (e) => {
    setData({ ...data, title: e.target.value });
  };
  const handleChangeDescription = (e) => {
    setData({ ...data, description: e.target.value });
  };
  const {
    ref: changeTitleRef,
    isComponentVisible: modTitle,
    setIsComponentVisible: setModTitle,
  } = useComponentVisible();
  const {
    ref: changeDescriptionRef,
    isComponentVisible: modDescription,
    setIsComponentVisible: setModDescription,
  } = useComponentVisible();
  const changeTitle = () => {
    setData(state.card);
    setModTitle(true);
  };
  const changeDescription = () => {
    setData(state.card);
    setModDescription(true);
  };
  const deleteCard = () => {
    Api.fetchResource(
      'DELETE',
      `board/${state.board._id}/list/${state.card.list}/card/${state.card._id}`,
      {},
      {},
      {},
    ).then((res) => {
      dispatch({ type: boardActions.BOARD__CLOSE_MODAL });
      dispatch({
        type: boardActions.BOARD__SET_REFRESH,
        payload: { refresh: true },
      });
    });
  };
  const changeCardOrder = (value) => {
    Api.fetchResource(
      'PATCH',
      `board/${state.board._id}/list/${state.card.list}/card/${state.card._id}`,
      {
        body: {
          order: value,
        },
      },
      {},
      {},
    ).then((res) => {
      dispatch({ type: boardActions.BOARD__CLOSE_MODAL });
      dispatch({
        type: boardActions.BOARD__SET_REFRESH,
        payload: { refresh: true },
      });
    });
  };
  const sendNewData = () => {
    Api.fetchResource(
      'PATCH',
      `board/${state.board._id}/list/${state.card.list}/card/${state.card._id}`,
      {
        body: {
          description: data.description,
          title: data.title,
        },
      },
      {},
      {},
    ).then((res) => {
      dispatch({
        type: boardActions.BOARD__SET_REFRESH,
        payload: { refresh: true },
      });
      dispatch({type: boardActions.BOARD__OPEN_MODAL_WITH_CARD, payload: {card: res}});
      setModDescription(false);
      setModTitle(false);
    });
  };
  const list = state.board.lists.filter((l) => l._id === state.card.list)[0];

  return (
    <div className={styles.modalRoot}>
      {!modTitle && (
        <div className={styles.titleContainer}>
          <div onClick={changeTitle} className={styles.titleFix}>
            <Text color="sky" width="100%">
              {state.card.title}
            </Text>
          </div>
        </div>
      )}
      {modTitle && (
        <div className={styles.title} ref={changeTitleRef}>
          <input
            className={styles.input}
            value={data.title}
            onChange={handleChangeTitle}
          />
          <span className={styles.saveIcon} onClick={sendNewData}>
            <Icon
              name="save"
              color="white"
              size="28px"
            />
          </span>
        </div>
      )}
      <div className={styles.description}>
        <Text tagHtml="h4">Description</Text>

        {!modDescription && (
          <div onClick={changeDescription}>
            <Text tagHtml="p">{state.card.description}</Text>
          </div>
        )}
        {(modDescription || !state.card.description) && (
          <div ref={changeDescriptionRef}>
            <textarea
              className={styles.input}
              value={data.description}
              onChange={handleChangeDescription}
            />
            <div className={styles.saveButton}>
              <div className={styles.buttonContainer}>
                <Button
                  label="save"
                  iconRight="save"
                  color="estherGreen"
                  fullWidth
                  onClick={sendNewData}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.deleteButton}>
        <Button
          label="Remove Card"
          color="tomato"
          fullWidth
          onClick={deleteCard}
        />
      </div>
      <div>
        <Select
          label="Position"
          value={state.card.order}
          onChange={changeCardOrder}
        >
          {list
            && list.cards.map((card) => (
              <Item value={card.order}>{card.order}</Item>
            ))}
        </Select>
      </div>
    </div>
  );
};
export default CardModalContent;

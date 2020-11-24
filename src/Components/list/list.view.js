import React, { useState } from 'react';
import {
  Text,
  Button,
  Icon,
  TextField,
  DropDown,
  Select,
  Item,
} from 'esther-components';
import styles from './list.module.css';
import { useBoardContext } from '../../context/boardContext/index';
import boardActions from '../../context/boardContext/types';
import Api from '../../api';
import ListCard from '../cards';
import { useComponentVisible } from '../../hooks';
import CardModal from '../cardModal';

const List = (props) => {
  const { list, boardLists } = props;
  const {
    ref: refHeader,
    isComponentVisible: headerVisible,
    setIsComponentVisible: setHeaderVisible,
  } = useComponentVisible();
  const {
    ref: refDropdown,
    isComponentVisible: dropVisible,
    setIsComponentVisible: setDropdownVisible,
  } = useComponentVisible();
  const {
    ref: refInputData,
    isComponentVisible: addCardComponent,
    setIsComponentVisible: setAddCardComponent,
  } = useComponentVisible();
  const [data, setData] = useState({ name: '' });
  const [cardData, setCardData] = useState({ title: '' });
  const [error, setError] = useState({});
  const { dispatch } = useBoardContext();
  const changeHeader = () => {
    setHeaderVisible(true);
  };
  const handleChangeName = (e) => {
    setData({ name: e.target.value });
  };
  const sendDataName = () => {
    Api.fetchResource('PATCH', `board/${list.board}/list/${list._id}`, {
      body: data,
    })
      .then((res) => {
        setHeaderVisible(true);
        dispatch({
          type: boardActions.BOARD__SET_REFRESH,
          payload: { refresh: true },
        });
      })
      .catch((apiError) => {
        setError(apiError.response.error);
      });
  };
  const deleteList = () => {
    Api.fetchResource('DELETE', `board/${list.board}/list/${list._id}`).then(
      (res) => {
        setDropdownVisible(false);
        dispatch({
          type: boardActions.BOARD__SET_REFRESH,
          payload: { refresh: true },
        });
      },
    );
  };
  if (data.name === '' && error.name) {
    setError({ name: '' });
  }
  const openDropDown = () => {
    setDropdownVisible(true);
  };
  const changeOrder = (value) => {
    Api.fetchResource('PATCH', `board/${list.board}/list/${list._id}`, {
      body: {
        order: value,
      },
    }).then((res) => {
      setDropdownVisible(false);
      dispatch({
        type: boardActions.BOARD__SET_REFRESH,
        payload: { refresh: true },
      });
    });
  };
  const addNewCard = () => {
    setAddCardComponent(true);
  };
  const handleChangeCardTitle = (e) => {
    setCardData({ title: e.target.value });
  };
  const postNewCard = () => {
    Api.fetchResource(
      'POST',
      `board/${list.board}/list/${list._id}/card`,
      { body: cardData },
      {},
      {},
    )
      .then((res) => {
        setCardData({ title: '' });
        setAddCardComponent(false);
        dispatch({
          type: boardActions.BOARD__SET_REFRESH,
          payload: { refresh: true },
        });
      })
      .catch((apiError) => {
        setError(apiError.response.error);
      });
  };
  if (!addCardComponent && cardData.title.length > 0) {
    setCardData({ title: '' });
  }
  return (
    <div>
      <div
        className={styles.header}
        id={`list-${list._id}`}
        key={`list-${list._id}`}
        ref={refHeader}
      >
        {!headerVisible && (
          <>
            <div className={styles.title} onClick={changeHeader}>
              <Text tagHtml="h4">{list.name}</Text>
            </div>
            <div>
              <DropDown
                color="white"
                visible={dropVisible}
                anchor={
                  <div className={styles.optionsButton} onClick={openDropDown}>
                    <Icon name="moreOpenholes" color="sky" />
                  </div>
                }
              >
                <div
                  className={styles.dropdownContainer}
                  ref={refDropdown}
                  key={`menu-list-${list._id}`}
                >
                  <div>
                    <Select
                      label="Position"
                      value={list.order}
                      color="sky"
                      onChange={changeOrder}
                    >
                      {boardLists &&
                        boardLists.map((boardList) => (
                          <Item value={boardList.order}>{boardList.order}</Item>
                        ))}
                    </Select>
                  </div>
                  <div>
                    <Button
                      label="Remove list"
                      fullWidth
                      color="tomato"
                      onClick={deleteList}
                    />
                  </div>
                </div>
              </DropDown>
            </div>
          </>
        )}

        {headerVisible && (
          <>
            <div className={styles.changeName}>
              <TextField
                label="Change Name"
                value={data.name}
                color="sky"
                onChange={handleChangeName}
                infoMessage={error.name}
                error={error.name}
                fullWidth
              />
            </div>
            <div className={styles.sendButton} onClick={sendDataName}>
              <Icon name="send" color="sky" />
            </div>
          </>
        )}
      </div>
      <div className={styles.cardContent}>
        {list.cards
          && list.cards.map((card) => (
            <div>
              <ListCard card={card} listCards={list.cards} />
            </div>
          ))}
      </div>
      {addCardComponent && (
        <div className={styles.cardContent} ref={refInputData}>
          <textarea
            className={styles.cardInput}
            placeholder="Enter a title for this card"
            onChange={handleChangeCardTitle}
            value={cardData.title}
            autoFocus
          />
          <div className={styles.inputButton}>
            <Button
              label="Add"
              variant="primary"
              color="estherGreen"
              fullWidth
              onClick={postNewCard}
            />
          </div>
        </div>
      )}
      {!addCardComponent && (
        <div>
          <Button
            label="Add another card"
            iconLeft="addCircle"
            variant="text"
            color="white"
            fullWidth
            onClick={addNewCard}
          />
        </div>
      )}
    </div>
  );
};

export default List;

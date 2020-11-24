import React from 'react';
import { Text } from 'esther-components';
import styles from './listCard.module.css';
import { useBoardContext } from '../../context/boardContext';
import boardActions from '../../context/boardContext/types';

const ListCard = (props) => {
  const { card } = props;
  const { dispatch } = useBoardContext();
  const handleOpenModal = () => {
    dispatch({
      type: boardActions.BOARD__OPEN_MODAL_WITH_CARD,
      payload: { card },
    });
  };
  return (
    <div className={styles.root} onClick={handleOpenModal}>
      <div className={styles.container}>
        <Text tagHtml="p" width="100%">
          {card.title}
        </Text>
      </div>
    </div>
  );
};

export default ListCard;

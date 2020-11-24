import React from 'react';
import Modal from '../Modal';
import { useBoardContext } from '../../context/boardContext';
import boardActions from '../../context/boardContext/types';
import CardModalContent from '../cardModalContent';

const CardModal = () => {
  const { state, dispatch } = useBoardContext();
  const handleCloseModal = () => {
    dispatch({ type: boardActions.BOARD__CLOSE_MODAL });
  };
  return (
    <Modal open={state.modal} onClose={handleCloseModal}>
      <CardModalContent />
    </Modal>
  );
};

export default CardModal;

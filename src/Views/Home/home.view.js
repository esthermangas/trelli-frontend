import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
 Button, Icon, Surface, Text, TextField 
} from 'esther-components';
import styles from './home.module.css';
import Modal from '../../Components/Modal';
import Api from '../../api';

const Home = () => {
  const [data, setData] = useState({ name: '' });
  const [error, setError] = useState({ name: '' });
  const [boards, setBoards] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const colors = ['#19a172', '#5F9EA0', '#d98e6f', '#E34954', '#D9D86F'];
  const { path } = useRouteMatch();

  useEffect(() => {
    if (refresh) {
      Api.fetchResource('GET', 'board').then((res) => {
        setBoards(res);
        setRefresh(false);
      });
    }
  }, [refresh]);
  const getRandomColor = () => colors[Math.floor(Math.random() * 10) % 5];
  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleClick = () => {
    Api.fetchResource('POST', 'board', { body: data })
      .then((res) => {
        setRefresh(true);
        setOpenModal(false);
      })
      .catch((apiError) => {
        const err = apiError.response.error;
        setError(err);
      });
  };
  const handleClickCloseModal = () => {
    setOpenModal(false);
  };
  const handleChangeName = (e) => {
    setData({ name: e.target.value });
  };
  const goToBoard = (board) => {
    // eslint-disable-next-line no-underscore-dangle
    history.push(`${path}/board/${board._id}`);
  };
  return (
    <div>
      <div className={styles.appBar}>
        <Button
          label="Create new Board"
          iconRight="plusSquare"
          color="white"
          variant="text"
          size="big"
          onClick={handleClickOpenModal}
        />
        <Modal open={openModal} onClose={handleClickCloseModal}>
          <Surface height="250px" width="300px" color="white">
            <div className={styles.surfaceContent}>
              <div className={styles.tittle}>
                <Text tagHtml="h3" color="sky" align="center">
                  Create a new board
                </Text>
              </div>
              <div className={styles.input}>
                <TextField
                  label="Name for the new board"
                  value={data.name}
                  color="sky"
                  fullWidth
                  onChange={handleChangeName}
                  error={error.name}
                  infoMessage={error.name}
                />
              </div>
              <div className={styles.button}>
                <Button
                  label="Add"
                  iconLeft="add"
                  color="sky"
                  variant="text"
                  onClick={handleClick}
                />
              </div>
            </div>
          </Surface>
        </Modal>
      </div>
      <div className={styles.container}>
        {boards &&
          boards.map((board) => (
            <div className={styles.item}>
              <div
                className={styles.board}
                style={{ backgroundColor: getRandomColor() }}
                onClick={() => goToBoard(board)}
              >
                <Text tagHtml="h4" align="center" display="block">
                  {board.name}
                </Text>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

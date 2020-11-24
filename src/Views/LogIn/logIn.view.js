import React, { useState } from 'react';
import { Surface, TextField, Button, Text } from 'esther-components';
import { Link, useHistory } from 'react-router-dom';
import Api from '../../api';
import styles from './logIn.module.css';

const LogIn = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChangeEmail = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const handleChangePassword = (e) => {
    setData({ ...data, password: e.target.value });
  };

  const logInUser = () => {
    Api.fetchResource('POST', 'auth/login', { body: data })
      .then((response) => {
        const { token } = response;
        localStorage.setItem('jwt', token);
        history.push('/app');
      })
      .catch((apiError) => {
        const err = apiError.response.error;
        setError(err);
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.surfaceContainer}>
        <Surface variant="elevation" height="350px" width="300px" color="white">
          <div className={styles.container}>
            <div className={styles.tittle}>
              <Text tagHtml="h2" color="sky" align="center">
                Log In
              </Text>
            </div>
            <div className={styles.input}>
              <TextField
                label="Email"
                color="sky"
                fullWidth
                onChange={handleChangeEmail}
                value={data.email}
                error={error.email}
                infoMessage={error.email}
              />
            </div>
            <div className={styles.input}>
              <TextField
                label="Password"
                color="sky"
                fullWidth
                onChange={handleChangePassword}
                value={data.password}
                error={error.password}
                infoMessage={error.password}
                password
              />
            </div>
            <div className={styles.button}>
              <Button label="LOG IN" color="sky" onClick={logInUser} />
            </div>
            <div className={styles.linkRegister}>
              <Text tagHtml="p" color="sky" align="center">
                Not registered yet? Sign up <Link to="/signup">here</Link>
              </Text>
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
};

export default LogIn;

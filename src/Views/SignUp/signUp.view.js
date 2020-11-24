import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
 Surface, Button, TextField, Text, } from 'esther-components';
import styles from './signUp.module.css';
import Api from '../../api';

const SignUp = () => {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ name: '', email: '', password: '' });
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const history = useHistory();

  const handleChangeName = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const handleChangeEmail = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const handleChangePassword = (e) => {
    setData({ ...data, password: e.target.value });
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (
    data.password !== confirmPassword
    && errorConfirmPassword === ''
    && confirmPassword.length > 0
    && data.password.length > 0
  ) {
    setErrorConfirmPassword('The passwords do not match');
  }

  if (
    data.password.length > 0 &&
    confirmPassword.length > 0 &&
    data.password === confirmPassword &&
    errorConfirmPassword !== ''
  ) {
    setErrorConfirmPassword('');
  }

  if (
    data.password.length === 0 &&
    confirmPassword.length === 0 &&
    errorConfirmPassword !== ''
  ) {
    setErrorConfirmPassword('');
  }

  const signUpUser = () => {
    Api.fetchResource('POST', 'auth/register', { body: data })
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
      <div className={styles.surfContainer}>
        <Surface height="450px" width="300px" color="white" variant="elevation">
          <div className={styles.container}>
            <div className={styles.tittle}>
              <Text color="sky" tagHtml="h2" align="center">
                Sign Up
              </Text>
            </div>
            <div className={styles.input}>
              <TextField
                label="Name"
                color="sky"
                value={data.name}
                onChange={handleChangeName}
                error={error.name}
                infoMessage={error.name}
              />
            </div>
            <div className={styles.input}>
              <TextField
                label="Email"
                color="sky"
                value={data.email}
                onChange={handleChangeEmail}
                error={error.email}
                infoMessage={error.email}
              />
            </div>
            <div className={styles.input}>
              <TextField
                label="Password"
                color="sky"
                value={data.password}
                onChange={handleChangePassword}
                error={error.password}
                infoMessage={error.password}
                password
              />
            </div>
            <div className={styles.input}>
              <TextField
                label="Confirm Password"
                color="sky"
                onChange={handleChangeConfirmPassword}
                value={confirmPassword}
                infoMessage={errorConfirmPassword}
                error={errorConfirmPassword}
                password
              />
            </div>
            <div className={styles.button}>
              <Button label="send" color="sky" onClick={signUpUser} />
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
};

export default SignUp;

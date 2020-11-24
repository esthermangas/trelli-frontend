import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from '../Home';
import Board from '../Board';
import styles from './main.module.css';

const Main = () => {
  const { path } = useRouteMatch();
  return (
    <div className={styles.root}>
      <Switch>
        <Route exact path={path} component={Home} />
        <Route exact path={`${path}/board/:id`} component={Board} />
      </Switch>
    </div>
  );
};

export default Main;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import LogIn from './Views/LogIn';
import Background from './images/background.jpg';
import SignUp from './Views/SignUp';
import Main from './Views/Main';

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute path="/app" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

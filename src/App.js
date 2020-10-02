import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import LogIn from './Views/LogIn/logIn.view';
import Background from './images/background.jpg';
import SignUp from './Views/SignUp/signUp.view';

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
          <PrivateRoute exact path="/app" render={() => <div>app</div>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from './components/home/HomePage';
import RegisterPage from './components/register/RegisterPage';
import LoginPage from './components/login/LoginPage';

class App extends Component {
  render() {
    return (
      <div>
        {/* Entry point App
            Define path for the other pages:
            Register, Login, Shopping list, Shopping items
          */}
        <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route exact={true} path="/auth/register/" component={RegisterPage} />
        <Route exact={true} path="/auth/login/" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}
export default App;

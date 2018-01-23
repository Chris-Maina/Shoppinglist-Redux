import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from './components/home/HomePage';
import RegisterPage from './components/register/RegisterPage';
import LoginPage from './components/login/LoginPage';
import ShoppinglistPage from './components/shoppinglist/ShoppinglistPage';
import ShoppingItemsPage from './components/shoppingitems/ShoppingItemsPage';
import requireLogin from './components/common/RequireLogin';
import UserProfile from './components/userprofile/UserProfile'

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
        <Route exact={true} path="/profile/" component={requireLogin(UserProfile)}/>
        <Route exact={true} path="/shoppinglists/" component={requireLogin(ShoppinglistPage)}/>
        <Route exact={true} path="/shoppinglists/:id/items" component={requireLogin(ShoppingItemsPage)}/>
        </Switch>
      </div>
    );
  }
}
export default App;

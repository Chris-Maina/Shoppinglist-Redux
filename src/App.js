import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from './components/home/HomePage';
import RegisterPage from './components/register/RegisterPage';
import LoginPage from './components/login/LoginPage';
import ShoppinglistPage from './components/shoppinglist/ShoppinglistPage';
import ShoppinglistForm from './components/shoppinglist/ShoppinglistForm';
import ShoppingItemsPage from './components/shoppingitems/ShoppingItemsPage';

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
        <Route exact={true} path="/shoppinglist" component={ShoppinglistPage}/>
        <Route exact={true} path={`/shoppinglist/:id`} component={ShoppinglistForm}/>
        <Route exact={true} path="/shoppinglist/:id/items" component={ShoppingItemsPage}/>
        </Switch>
      </div>
    );
  }
}
export default App;

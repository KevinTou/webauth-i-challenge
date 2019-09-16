import React from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../utils/PrivateRoute.js';

import NavBar from './navigation/NavBar.js';
import Login from './auth/Login.js';
import Register from './auth/Register.js';
import Users from './users/Users.js';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/users' component={Users} />
        <Redirect from='/' to='/users' />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

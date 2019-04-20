import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import MainSidebar from './components/MainSidebar';
import Replies from './components/Replies/index';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
    </Switch>
  </BrowserRouter>
);

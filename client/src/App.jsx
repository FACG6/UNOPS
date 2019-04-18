import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import NewTicket from './components/NewTicket';
import MainSidebar from './components/MainSidebar';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" />
      <Route exact path="/new-ticket" component={NewTicket} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
    </Switch>
  </BrowserRouter>
);

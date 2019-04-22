import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import NewTicket from './components/NewTicket';
import MainSidebar from './components/MainSidebar';
import Replies from './components/Replies/index';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Replies} />
      <Route exact path="/new-ticket" component={NewTicket} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
      <Route exact path="/ticket" component={() => <MainSidebar selected="tickets" />} />
    </Switch>
  </BrowserRouter>
);

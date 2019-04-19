import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SearchSidebar from './components/searchSidebar/index';
import Home from './components/Homepage/index';
import NewTicket from './components/NewTicket';
import MainSidebar from './components/MainSidebar';
import './App.css';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div />} />
      <Route path="/search" render={() => <SearchSidebar />} />
      <Route path="/tickets/all/pending" component={() => <Home pendingClass="selected" />} />
      <Route path="/tickets/all/closed" component={() => <Home closedClass="selected" />} />
      <Route exact path="/" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
      <Route exact path="/new-ticket" component={() => <NewTicket />} />
    </Switch>
  </BrowserRouter>
);

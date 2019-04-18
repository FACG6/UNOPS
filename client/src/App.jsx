import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import SearchSidebar from './components/searchSidebar/sidebar';
import Home from './components/Homepage/index';
import MainSidebar from './components/MainSidebar';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div />} />
      <Route path="/search" render={() => <SearchSidebar />} />
      <Route path="/tickets/all/pending" component={() => <Home pendingClass="selected" />} />
      <Route path="/homepage/closed" component={() => <Home closedClass="selected" />} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
    </Switch>
  </BrowserRouter>
);

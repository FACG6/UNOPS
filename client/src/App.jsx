import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SearchSidebar from './components/searchSidebar/sidebar';
import Home from './components/Homepage/index';
import '.';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div />} />
      <Route path="/search" render={() => <SearchSidebar />} />
      <Route path="/homepage/pending" component={() => <Home pendingClass="selected" />} />
      <Route path="/homepage/closed" component={() => <Home closedClass="selected" />} />
    </Switch>
  </BrowserRouter>
);

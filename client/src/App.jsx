import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
<<<<<<< HEAD
import SearchSidebar from './components/searchSidebar/sidebar';
import Home from './components/Homepage/index';
import '.';
=======
import MainSidebar from './components/MainSidebar';
>>>>>>> 30cb9146ceee67ded07cb4b6550bb768d47be0b8

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div />} />
<<<<<<< HEAD
      <Route path="/search" render={() => <SearchSidebar />} />
      <Route path="/homepage/pending" component={() => <Home pendingClass="selected" />} />
      <Route path="/homepage/closed" component={() => <Home closedClass="selected" />} />
=======
      <Route exact path="/login" component={Login} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
>>>>>>> 30cb9146ceee67ded07cb4b6550bb768d47be0b8
    </Switch>
  </BrowserRouter>
);

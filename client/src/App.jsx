import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import MainSidebar from './components/MainSidebar';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div />} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
    </Switch>
  </BrowserRouter>
);

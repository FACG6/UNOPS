import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NewTicket from './components/NewTicket';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div />} />
      <Route exact path="/new-ticket" component={() => <NewTicket />} />
    </Switch>
  </BrowserRouter>
);

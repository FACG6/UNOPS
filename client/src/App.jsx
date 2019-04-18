import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import WrappedTicket from './component/WrappedTicket/index'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={WrappedTicket} />
    </Switch>
  </BrowserRouter>
);

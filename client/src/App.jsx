import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div />} />
    </Switch>
  </BrowserRouter>
);

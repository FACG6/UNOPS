import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SearchComponent from './components/search';
import Home from './components/Homepage';
import NewTicket from './components/NewTicket';
import MainSidebar from './components/MainSidebar';
import OpenedTicket from './components/opened-ticket';
import Reports from './components/reports';
import './App.css';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={() => <div />} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
      <Route exact path="/new-ticket" component={NewTicket} />
      <Route path="/tickets/:cat/:status" component={Home} />
      <Route path="/search/:status" component={SearchComponent} />
      <Route path="/reports/:timespan" component={Reports} />
      <Route
        exact
        path="/opened-ticket"
        component={() => <OpenedTicket subject="Ticket subject" status="Pending" />}
      />
    </Switch>
  </Router>
);
